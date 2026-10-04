# soru-cikar

Soru bankası PDF'inden her soruyu ayrı PNG olarak keser, `questions.json` üretir.

```bash
pip install -r requirements.txt
python soru_cikar.py kitap.pdf -o cikti --pages 1-5 --debug   # önce 5 sayfayla dene
python soru_cikar.py kitap.pdf -o cikti                       # sonra hepsi
```

Çıktı: `cikti/images/*.png`, `cikti/questions.json`, (`--debug` ile) `cikti/debug/sayfa_XXX.png`
(kırpma kutuları kırmızı çizilir; hatalıysa buradan görürsün).

Ayarlar: `--dpi 200`, `--columns 1|2` (varsayılan otomatik), `--top/--bottom` (başlık ve sayfa numarası payı),
`--min-gap` (numarasız sayfalarda sorular arası boşluk).

Yöntem: PDF'te "1." "2)" gibi numaralar metin olarak varsa konumlarına göre keser (`yontem: metin-numara`).
Yoksa (tamamen görsel sayfa) boşluklara göre keser (`yontem: bosluk`, `numara: null`).
