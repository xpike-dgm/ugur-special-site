#!/usr/bin/env python3
"""Soru bankası PDF'inden her soruyu ayrı bir görsel (PNG) olarak keser ve
questions.json üretir.

Kullanım:
    python soru_cikar.py kitap.pdf -o cikti
    python soru_cikar.py kitap.pdf -o cikti --pages 1-10 --debug

Yöntem:
  1. Sayfa yüksek çözünürlükte görsele çevrilir (metin olsun olmasın aynı yol).
  2. Sayfa 1 veya 2 sütun olarak otomatik algılanır.
  3. Her sütunda soru başlangıçları bulunur:
       a) PDF'te "1." "2)" gibi numaralar metin olarak varsa onların konumu,
       b) yoksa (tamamen taranmış/görsel sayfa) boşluk analiziyle bloklar.
  4. Her soru kırpılıp PNG olarak kaydedilir; varsa PDF metni de JSON'a yazılır.
"""

import argparse
import json
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF
import numpy as np
from PIL import Image, ImageDraw

NUM_RE = re.compile(r"^(\d{1,3})\s*[.)]$")
INK_THRESHOLD = 200  # 0-255; bundan koyu piksel "mürekkep" sayılır


def parse_pages(spec, total):
    if not spec:
        return list(range(total))
    pages = set()
    for part in spec.split(","):
        if "-" in part:
            a, b = part.split("-")
            pages.update(range(int(a) - 1, min(int(b), total)))
        else:
            pages.add(int(part) - 1)
    return sorted(p for p in pages if 0 <= p < total)


def render(page, dpi):
    pix = page.get_pixmap(dpi=dpi, colorspace=fitz.csGRAY, alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width)
    return pix, img


def runs(mask, min_len):
    """mask True/False dizisinde en az min_len uzunluklu True aralıkları."""
    out, start = [], None
    for i, v in enumerate(mask):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start >= min_len:
                out.append((start, i))
            start = None
    if start is not None and len(mask) - start >= min_len:
        out.append((start, len(mask)))
    return out


def detect_columns(ink, forced):
    """[(x0, x1), ...] sütun aralıkları (piksel)."""
    h, w = ink.shape
    if forced == 1:
        return [(0, w)]
    col_ink = ink.sum(axis=0)
    lo, hi = int(w * 0.35), int(w * 0.65)
    blank = col_ink[lo:hi] == 0
    gutters = runs(blank, max(4, int(w * 0.012)))
    if gutters:
        g0, g1 = max(gutters, key=lambda r: r[1] - r[0])
        mid = lo + (g0 + g1) // 2
        return [(0, mid), (mid, w)]
    return [(0, w)] if forced != 2 else [(0, w // 2), (w // 2, w)]


def text_anchors(page, zoom, col, top_px, bottom_px):
    """Sütundaki soru numarası konumları -> [(numara, y_px)]."""
    x0, x1 = col
    width = x1 - x0
    found = []
    for wx0, wy0, wx1, wy1, word, *_ in page.get_text("words"):
        m = NUM_RE.match(word.strip())
        if not m:
            continue
        px, py = wx0 * zoom, wy0 * zoom
        if not (x0 <= px <= x0 + width * 0.18 and top_px <= py <= bottom_px):
            continue
        found.append((int(m.group(1)), py))
    found.sort(key=lambda t: t[1])
    # gürültüyü ele: numaralar artan gitmeli (sayfa içinde)
    clean, last = [], 0
    for n, y in found:
        if n > last:
            clean.append((n, y))
            last = n
    return clean


def gap_blocks(ink, col, top_px, bottom_px, min_gap):
    """Metin numarası yoksa: sütunu yatay boşluklara göre bloklara ayır."""
    x0, x1 = col
    rows = ink[top_px:bottom_px, x0:x1].sum(axis=1) > 0
    # küçük boşlukları (formül içi) kapat, büyükleri bölücü say
    filled = rows.copy()
    for a, b in runs(~rows, 1):
        if b - a < min_gap:
            filled[a:b] = True
    return [(top_px + a, top_px + b) for a, b in runs(filled, 8)]


def tight_bbox(ink, x0, y0, x1, y1, pad):
    sub = ink[y0:y1, x0:x1]
    ys, xs = np.where(sub)
    if len(ys) == 0:
        return None
    return (
        max(0, x0 + xs.min() - pad),
        max(0, y0 + ys.min() - pad),
        min(ink.shape[1], x0 + xs.max() + pad),
        min(ink.shape[0], y0 + ys.max() + pad),
    )


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf")
    ap.add_argument("-o", "--out", default="cikti")
    ap.add_argument("--dpi", type=int, default=200)
    ap.add_argument("--pages", help="örn. 1-10,15 (varsayılan: hepsi)")
    ap.add_argument("--columns", type=int, choices=[1, 2], help="sütun sayısını zorla (varsayılan: otomatik)")
    ap.add_argument("--top", type=float, default=0.05, help="sayfa üstünden atlanacak oran (başlık/üstbilgi)")
    ap.add_argument("--bottom", type=float, default=0.05, help="sayfa altından atlanacak oran (sayfa no)")
    ap.add_argument("--min-gap", type=float, default=0.025, help="numarasız sayfada soruları ayıran boşluk (sayfa yüksekliği oranı)")
    ap.add_argument("--no-text", action="store_true", help="JSON'a PDF metnini ekleme")
    ap.add_argument("--debug", action="store_true", help="kırpma kutularını çizilmiş sayfa görselleri de üret")
    args = ap.parse_args()

    out = Path(args.out)
    img_dir = out / "images"
    img_dir.mkdir(parents=True, exist_ok=True)
    dbg_dir = out / "debug"
    if args.debug:
        dbg_dir.mkdir(exist_ok=True)

    doc = fitz.open(args.pdf)
    zoom = args.dpi / 72
    questions = []
    counter = 0

    for pno in parse_pages(args.pages, len(doc)):
        page = doc[pno]
        pix, gray = render(page, args.dpi)
        ink = gray < INK_THRESHOLD
        h, w = ink.shape
        top_px, bottom_px = int(h * args.top), int(h * (1 - args.bottom))
        min_gap = max(8, int(h * args.min_gap))

        dbg = None
        if args.debug:
            dbg = Image.fromarray(gray).convert("RGB")
            draw = ImageDraw.Draw(dbg)

        for ci, col in enumerate(detect_columns(ink[top_px:bottom_px], args.columns)):
            anchors = text_anchors(page, zoom, col, top_px, bottom_px)
            if anchors:
                mode = "metin-numara"
                ys = [y for _, y in anchors] + [bottom_px]
                spans = [
                    (n, int(ys[i]) - 6, int(ys[i + 1]) - 6)
                    for i, (n, _) in enumerate(anchors)
                ]
            else:
                mode = "bosluk"
                spans = [(None, a, b) for a, b in gap_blocks(ink, col, top_px, bottom_px, min_gap)]

            for number, y0, y1 in spans:
                box = tight_bbox(ink, col[0], max(y0, top_px), col[1], min(y1, bottom_px), pad=12)
                if box is None:
                    continue
                counter += 1
                x0, y0b, x1b, y1b = box
                name = f"s{pno + 1:03d}_{counter:04d}.png"
                Image.fromarray(gray[y0b:y1b, x0:x1b]).save(img_dir / name)

                text = ""
                if not args.no_text:
                    clip = fitz.Rect(x0 / zoom, y0b / zoom, x1b / zoom, y1b / zoom)
                    text = page.get_text("text", clip=clip).strip()

                questions.append(
                    {
                        "id": counter,
                        "numara": number,
                        "sayfa": pno + 1,
                        "sutun": ci + 1,
                        "yontem": mode,
                        "gorsel": f"images/{name}",
                        "bbox_px": [int(x0), int(y0b), int(x1b), int(y1b)],
                        "metin": text,
                    }
                )
                if dbg is not None:
                    draw.rectangle([x0, y0b, x1b, y1b], outline=(255, 0, 0), width=3)
                    draw.text((x0 + 4, y0b + 4), f"#{counter}", fill=(255, 0, 0))

        if dbg is not None:
            dbg.save(dbg_dir / f"sayfa_{pno + 1:03d}.png")
        print(f"sayfa {pno + 1}/{len(doc)} tamam ({counter} soru)", file=sys.stderr)

    (out / "questions.json").write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{counter} soru -> {out / 'questions.json'}")


if __name__ == "__main__":
    main()
