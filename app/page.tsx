'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Factory,
  Globe2,
  AtSign,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react';

type Language = 'tr' | 'en' | 'ar';
type GalleryFilter = 'all' | 'current' | 'archive';

type Copy = {
  brandLine: string;
  nav: { home: string; about: string; services: string; gallery: string; contact: string };
  language: string;
  call: string;
  hero: {
    eyebrow: string;
    lineOne: string;
    lineTwo: string;
    accent: string;
    description: string;
    primary: string;
    secondary: string;
    note: string;
    experience: string;
    experienceLabel: string;
    trusted: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    paragraphOne: string;
    paragraphTwo: string;
    quote: string;
    stats: Array<{ value: string; label: string }>;
    label: string;
  };
  services: { eyebrow: string; title: string; accent: string; description: string; cardLabel: string; footer: string };
  process: { eyebrow: string; title: string; items: Array<{ number: string; title: string; description: string }> };
  gallery: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    all: string;
    current: string;
    archive: string;
    archiveNote: string;
    view: string;
  };
  video: { eyebrow: string; title: string; accent: string; description: string; button: string };
  contact: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    callTitle: string;
    callDescription: string;
    mailTitle: string;
    addressTitle: string;
    hoursTitle: string;
    hours: string;
    map: string;
    whatsapp: string;
    footerCta: string;
    footerDescription: string;
  };
  modalClose: string;
  currentTag: string;
  archiveTag: string;
};

const copy: Record<Language, Copy> = {
  tr: {
    brandLine: 'DESEN TASARIM UYGULAMA',
    nav: { home: 'Ana Sayfa', about: 'Hakkımızda', services: 'Hizmetler', gallery: 'Galeri', contact: 'İletişim' },
    language: 'Dil',
    call: 'Hemen ara',
    hero: {
      eyebrow: 'DESEN TASARIM UYGULAMA  /  ÇAĞLAYAN · İSTANBUL',
      lineOne: 'Kumaşa',
      lineTwo: 'karakter,',
      accent: 'üretime güç.',
      description: 'Tekstil üreticileri için özel desen, nakış ve dikiş uygulamaları. Fikrinizi üretime hazır, güçlü bir yüzeye dönüştürüyoruz.',
      primary: 'Telefonla görüşelim',
      secondary: 'Çalışmaları incele',
      note: 'Tekstil üreticileri için',
      experience: '20',
      experienceLabel: 'yıllık tecrübe',
      trusted: 'Uğur Teknik Makina deneyimiyle',
      scroll: 'Keşfet',
    },
    about: {
      eyebrow: 'BİZ KİMİZ?',
      title: 'Tekniği, estetikle',
      accent: 'buluşturuyoruz.',
      paragraphOne: 'Uğur Special; tekstil üreticilerinin koleksiyonlarına karakter katan desen tasarım, nakış ve special dikiş uygulamaları sunar.',
      paragraphTwo: 'Uğur Teknik Makina’nın 1986’dan gelen makine ve üretim tecrübesiyle, Çağlayan’daki iki firmamızla hizmet vermeye devam ediyoruz. Her işte aynı odağımız var: temiz uygulama, doğru teknik ve güvenilir iletişim.',
      quote: 'Bir desen, doğru uygulamayla markanın imzasına dönüşür.',
      stats: [
        { value: '1986', label: 'Uğur Teknik Makina kuruluşu' },
        { value: '20+', label: 'yıllık tekstil tecrübesi' },
        { value: '2', label: 'Çağlayan’da hizmet noktası' },
      ],
      label: 'UĞUR SPECIAL / İŞİN DETAYI',
    },
    services: {
      eyebrow: 'ÜRETİM KABİLİYETİMİZ',
      title: 'Desenin her',
      accent: 'katmanına hâkimiz.',
      description: 'Koleksiyonunuzun ihtiyacına göre teknik uygulamayı birlikte şekillendiriyor, numuneden üretime kadar aynı özeni koruyoruz.',
      cardLabel: 'UYGULAMA',
      footer: 'Güncel hizmet kapsamı için bizi arayın.',
    },
    process: {
      eyebrow: 'ÇALIŞMA ŞEKLİMİZ',
      title: 'Fikirden kumaşa,',
      items: [
        { number: '01', title: 'Fikri dinleriz', description: 'Deseninizi, kumaşınızı ve üretim hedefinizi birlikte netleştiririz.' },
        { number: '02', title: 'Tekniği seçeriz', description: 'En doğru dikiş, nakış veya uygulama tekniğini belirleriz.' },
        { number: '03', title: 'Numuneyi görürüz', description: 'Detayları üretim öncesinde kontrol eder, sonucu birlikte değerlendiririz.' },
        { number: '04', title: 'Üretime geçeriz', description: 'Onaylanan uygulamayı düzenli ve güvenilir biçimde üretime taşırız.' },
      ],
    },
    gallery: {
      eyebrow: 'SEÇKİMİZ',
      title: 'İşin detayını',
      accent: 'yakından görün.',
      description: 'Farklı yüzey, iplik ve ritimlerle şekillenen uygulamalarımızdan bir seçki.',
      all: 'Tümü',
      current: 'Güncel işler',
      archive: 'Arşiv',
      archiveNote: 'Arşiv görselleri geçmiş uygulamaları gösterir. Taş dizayn ve inci çakma güncel hizmet kapsamımızda değildir.',
      view: 'Büyüt',
    },
    video: {
      eyebrow: 'UĞUR SPECIAL’I TANIYIN',
      title: 'Atölyemizden,',
      accent: 'doğrudan size.',
      description: 'İş yerimizi ve üretim yaklaşımımızı anlattığımız kısa tanıtım videosunu izleyin.',
      button: 'Videoyu YouTube’da aç',
    },
    contact: {
      eyebrow: 'BİRLİKTE ÜRETELİM',
      title: 'Yeni işinizi',
      accent: 'konuşalım.',
      description: 'Koleksiyonunuzdaki desen ve dikiş uygulamalarını birlikte planlayalım. Fiyat ve üretim detayları için bizi arayın.',
      callTitle: 'Telefon',
      callDescription: 'Teklif ve üretim detayları için',
      mailTitle: 'E-posta',
      addressTitle: 'Adres',
      hoursTitle: 'Çalışma saatleri',
      hours: 'Hafta içi · 09:00 — 19:00',
      map: 'Haritada aç',
      whatsapp: 'WhatsApp’tan yaz',
      footerCta: 'Deseniniz için doğru uygulama.',
      footerDescription: 'Uğur Special · Çağlayan, İstanbul',
    },
    modalClose: 'Görseli kapat',
    currentTag: 'Güncel uygulama',
    archiveTag: 'Arşiv seçkisi',
  },
  en: {
    brandLine: 'PATTERN DESIGN & APPLICATION',
    nav: { home: 'Home', about: 'About', services: 'Services', gallery: 'Gallery', contact: 'Contact' },
    language: 'Language',
    call: 'Call now',
    hero: {
      eyebrow: 'PATTERN DESIGN & APPLICATION  /  CAGLAYAN · ISTANBUL',
      lineOne: 'Give fabric',
      lineTwo: 'character,',
      accent: 'give production power.',
      description: 'Custom pattern, embroidery and special stitching applications for textile manufacturers. We turn your idea into a production-ready surface with presence.',
      primary: 'Let’s talk by phone',
      secondary: 'View our work',
      note: 'For textile manufacturers',
      experience: '20',
      experienceLabel: 'years of experience',
      trusted: 'Backed by Uğur Teknik Makina',
      scroll: 'Discover',
    },
    about: {
      eyebrow: 'WHO WE ARE',
      title: 'Where technique meets',
      accent: 'aesthetic.',
      paragraphOne: 'Uğur Special creates the pattern design, embroidery and special stitching applications that give textile collections their character.',
      paragraphTwo: 'With the machine and production experience of Uğur Teknik Makina, founded in 1986, we continue to serve from our two locations in Caglayan. Our focus stays the same on every job: clean application, precise technique and dependable communication.',
      quote: 'With the right application, a pattern becomes a brand signature.',
      stats: [
        { value: '1986', label: 'Uğur Teknik Makina founded' },
        { value: '20+', label: 'years in textile applications' },
        { value: '2', label: 'locations in Caglayan' },
      ],
      label: 'UĞUR SPECIAL / THE DETAIL OF THE WORK',
    },
    services: {
      eyebrow: 'OUR CAPABILITIES',
      title: 'We know every',
      accent: 'layer of a pattern.',
      description: 'We shape the technical application around your collection and keep the same care from sampling through production.',
      cardLabel: 'APPLICATION',
      footer: 'Call us for the current service scope.',
    },
    process: {
      eyebrow: 'HOW WE WORK',
      title: 'From idea to fabric,',
      items: [
        { number: '01', title: 'We listen', description: 'We clarify your pattern, fabric and production goal together.' },
        { number: '02', title: 'We choose the technique', description: 'We select the right stitch, embroidery or application method.' },
        { number: '03', title: 'We review the sample', description: 'We check the details before production and evaluate the result together.' },
        { number: '04', title: 'We move to production', description: 'We carry the approved application into production consistently and reliably.' },
      ],
    },
    gallery: {
      eyebrow: 'SELECTED WORK',
      title: 'See the detail',
      accent: 'up close.',
      description: 'A selection of applications shaped by different surfaces, threads and rhythms.',
      all: 'All',
      current: 'Current work',
      archive: 'Archive',
      archiveNote: 'Archive visuals show past applications. Stone design and pearl application are not part of our current services.',
      view: 'Enlarge',
    },
    video: {
      eyebrow: 'MEET UĞUR SPECIAL',
      title: 'From our workshop,',
      accent: 'straight to you.',
      description: 'Watch the short video introducing our workplace and production approach.',
      button: 'Open on YouTube',
    },
    contact: {
      eyebrow: 'LET’S MAKE IT TOGETHER',
      title: 'Let’s talk about',
      accent: 'your next piece.',
      description: 'Let’s plan the pattern and stitching applications in your collection. Call us for pricing and production details.',
      callTitle: 'Phone',
      callDescription: 'For pricing and production details',
      mailTitle: 'Email',
      addressTitle: 'Address',
      hoursTitle: 'Opening hours',
      hours: 'Weekdays · 09:00 — 19:00',
      map: 'Open in maps',
      whatsapp: 'Message on WhatsApp',
      footerCta: 'The right application for your pattern.',
      footerDescription: 'Uğur Special · Caglayan, Istanbul',
    },
    modalClose: 'Close image',
    currentTag: 'Current application',
    archiveTag: 'Archive selection',
  },
  ar: {
    brandLine: 'تصميم وتطبيق النقوش',
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', gallery: 'الأعمال', contact: 'اتصل بنا' },
    language: 'اللغة',
    call: 'اتصل الآن',
    hero: {
      eyebrow: 'تصميم وتطبيق النقوش  /  جاغلايان · إسطنبول',
      lineOne: 'نمنح القماش',
      lineTwo: 'شخصية،',
      accent: 'ونمنح الإنتاج قوة.',
      description: 'تطبيقات مخصصة للنقوش والتطريز والغرز الخاصة لمصنّعي المنسوجات. نحول فكرتكم إلى سطح جاهز للإنتاج وحاضر بقوة.',
      primary: 'لنتحدث هاتفياً',
      secondary: 'شاهد أعمالنا',
      note: 'لمصنّعي المنسوجات',
      experience: '20',
      experienceLabel: 'عاماً من الخبرة',
      trusted: 'بخبرة أوغور تكنيك ماكينة',
      scroll: 'اكتشف',
    },
    about: {
      eyebrow: 'من نحن؟',
      title: 'نجمع بين التقنية و',
      accent: 'الجمال.',
      paragraphOne: 'تقدم أوغور سبيشل تطبيقات تصميم النقوش والتطريز والغرز الخاصة التي تمنح مجموعات المنسوجات طابعها المميز.',
      paragraphTwo: 'بفضل خبرة أوغور تكنيك ماكينة في الآلات والإنتاج منذ تأسيسها عام 1986، نواصل خدمتكم من شركتين في جاغلايان. تركيزنا في كل عمل هو التطبيق النظيف، التقنية الدقيقة والتواصل الموثوق.',
      quote: 'النقش يتحول إلى توقيع للعلامة مع التطبيق الصحيح.',
      stats: [
        { value: '1986', label: 'تأسيس أوغور تكنيك ماكينة' },
        { value: '20+', label: 'عاماً في تطبيقات النسيج' },
        { value: '2', label: 'موقعان في جاغلايان' },
      ],
      label: 'أوغور سبيشل / تفاصيل العمل',
    },
    services: {
      eyebrow: 'قدراتنا الإنتاجية',
      title: 'نتقن كل',
      accent: 'طبقات النقش.',
      description: 'نحدد التطبيق التقني وفق احتياجات مجموعتكم ونحافظ على العناية نفسها من العينة حتى الإنتاج.',
      cardLabel: 'تطبيق',
      footer: 'اتصلوا بنا لمعرفة نطاق الخدمات الحالي.',
    },
    process: {
      eyebrow: 'طريقة عملنا',
      title: 'من الفكرة إلى القماش،',
      items: [
        { number: '01', title: 'نستمع إلى فكرتكم', description: 'نحدد النقش والقماش وهدف الإنتاج معاً.' },
        { number: '02', title: 'نختار التقنية', description: 'نحدد طريقة الغرز أو التطريز أو التطبيق الأنسب.' },
        { number: '03', title: 'نراجع العينة', description: 'نراجع التفاصيل قبل الإنتاج ونقيّم النتيجة معاً.' },
        { number: '04', title: 'نبدأ الإنتاج', description: 'ننقل التطبيق المعتمد إلى الإنتاج بثبات وموثوقية.' },
      ],
    },
    gallery: {
      eyebrow: 'مختاراتنا',
      title: 'شاهدوا تفاصيل',
      accent: 'العمل عن قرب.',
      description: 'مختارات من تطبيقات تشكلت بتنوع الأسطح والخيوط والإيقاعات.',
      all: 'الكل',
      current: 'أعمال حالية',
      archive: 'الأرشيف',
      archiveNote: 'صور الأرشيف تعرض تطبيقات سابقة. تصميم الأحجار وتثبيت اللؤلؤ ليسا ضمن خدماتنا الحالية.',
      view: 'تكبير',
    },
    video: {
      eyebrow: 'تعرّفوا على أوغور سبيشل',
      title: 'من مشغلنا،',
      accent: 'مباشرة إليكم.',
      description: 'شاهدوا الفيديو القصير الذي يعرّف بمكان العمل ونهجنا في الإنتاج.',
      button: 'فتح على يوتيوب',
    },
    contact: {
      eyebrow: 'لِنُنتج معاً',
      title: 'لنتحدث عن',
      accent: 'عملكم القادم.',
      description: 'لنخطط معاً لتطبيقات النقوش والغرز في مجموعتكم. اتصلوا بنا لمعرفة الأسعار وتفاصيل الإنتاج.',
      callTitle: 'الهاتف',
      callDescription: 'للأسعار وتفاصيل الإنتاج',
      mailTitle: 'البريد الإلكتروني',
      addressTitle: 'العنوان',
      hoursTitle: 'ساعات العمل',
      hours: 'أيام الأسبوع · 09:00 — 19:00',
      map: 'فتح الخريطة',
      whatsapp: 'راسلنا عبر واتساب',
      footerCta: 'التطبيق الصحيح لنقشكم.',
      footerDescription: 'أوغور سبيشل · جاغلايان، إسطنبول',
    },
    modalClose: 'إغلاق الصورة',
    currentTag: 'تطبيق حالي',
    archiveTag: 'مختارات الأرشيف',
  },
};

const services = [
  { key: '01', tr: 'Desen Tasarım Uygulama', en: 'Pattern Design & Application', ar: 'تصميم وتطبيق النقوش', trDescription: 'Koleksiyonun ruhuna göre desenin yüzeye uyarlanması.', enDescription: 'Adapting the pattern to the surface and spirit of the collection.', arDescription: 'تكييف النقش مع سطح المجموعة وروحها.' },
  { key: '02', tr: 'Otomatik Nakış', en: 'Automated Embroidery', ar: 'التطريز الآلي', trDescription: 'Net, ritmik ve üretime hazır nakış uygulamaları.', enDescription: 'Precise, rhythmic embroidery applications ready for production.', arDescription: 'تطبيقات تطريز دقيقة ومنتظمة وجاهزة للإنتاج.' },
  { key: '03', tr: 'Special Dikişler', en: 'Special Stitching', ar: 'الغرز الخاصة', trDescription: 'Kumaşa hareket, çizgi ve karakter katan özel dikişler.', enDescription: 'Special stitches that add movement, line and character to fabric.', arDescription: 'غرز خاصة تضيف الحركة والخط والشخصية إلى القماش.' },
  { key: '04', tr: 'Dekoratif Süs Dikişleri', en: 'Decorative Ornamental Stitches', ar: 'غرز زخرفية', trDescription: 'Görsel ritmi güçlendiren dekoratif yüzey detayları.', enDescription: 'Decorative surface details that strengthen visual rhythm.', arDescription: 'تفاصيل سطحية زخرفية تعزز الإيقاع البصري.' },
  { key: '05', tr: 'Süsreçme & Reçme', en: 'Coverstitch & Overlock', ar: 'غرزة التغطية والريشمة', trDescription: 'Esnek ve temiz bitişler için farklı reçme uygulamaları.', enDescription: 'Coverstitch applications for flexible, clean finishing.', arDescription: 'تطبيقات غرزة التغطية لإنهاء مرن ونظيف.' },
  { key: '06', tr: 'Jakarlı Gipe & Lastik', en: 'Jacquard Cord & Elastic', ar: 'حبال جاكار وإلاستيك', trDescription: 'Dokulu şerit ve lastik detaylarıyla özel yüzeyler.', enDescription: 'Distinct surfaces with textured cords and elastic details.', arDescription: 'أسطح مميزة بحبال مزخرفة وتفاصيل مطاطية.' },
  { key: '07', tr: 'Kroşeta', en: 'Crochet Stitch', ar: 'غرز الكروشيه', trDescription: 'İnce veya belirgin ritimlerde kroşeta uygulamaları.', enDescription: 'Crochet stitch applications in subtle or expressive rhythms.', arDescription: 'تطبيقات كروشيه بإيقاعات ناعمة أو واضحة.' },
  { key: '08', tr: 'Gül Çoban & Fitil', en: 'Gül Çoban & Piping', ar: 'غول تشوبان وتفاصيل الحواف', trDescription: 'Kabartılı çiçek ve fitil detaylarıyla zengin dokular.', enDescription: 'Rich textures with raised floral and piping details.', arDescription: 'ملمس غني بتفاصيل زهرية بارزة وحواف دقيقة.' },
  { key: '09', tr: 'Nervür, Punto & Zincir', en: 'Pintucks, Punto & Chain', ar: 'نرفور وبونتو وسلسلة', trDescription: 'Çizgisel ve ritmik yüzey uygulamalarından seçkiler.', enDescription: 'A selection of linear and rhythmic surface applications.', arDescription: 'مختارات من التطبيقات السطحية الخطية والإيقاعية.' },
  { key: '10', tr: 'Otomatik Boncuk İşleme', en: 'Automated Bead Work', ar: 'معالجة الخرز الآلية', trDescription: 'Koleksiyona ışıltı ve ritim ekleyen boncuk uygulamaları.', enDescription: 'Bead applications that add rhythm and subtle shine to a collection.', arDescription: 'تطبيقات خرز تضيف الإيقاع واللمعان إلى المجموعة.' },
  { key: '11', tr: 'Lazer Kesim', en: 'Laser Cutting', ar: 'القص بالليزر', trDescription: 'Desene netlik ve güçlü bir grafik etki kazandıran kesimler.', enDescription: 'Clean cuts that give patterns graphic clarity and impact.', arDescription: 'قصات واضحة تمنح النقوش تأثيراً بيانياً قوياً.' },
  { key: '12', tr: 'Pul Payet', en: 'Sequin Application', ar: 'تطبيق الترتر', trDescription: 'Işığı hareketlendiren pul payet uygulamaları.', enDescription: 'Sequin applications that bring movement to light.', arDescription: 'تطبيقات ترتر تحرك الضوء على السطح.' },
];

const galleryItems = [
  { src: '/gallery/01-special-dikis.png', tr: 'Special dikiş repertuvarı', en: 'Special stitching repertoire', ar: 'مختارات من الغرز الخاصة', category: 'current' as GalleryFilter },
  { src: '/gallery/02-special-dikisler.png', tr: 'Farklı yüzeylerde uygulama', en: 'Applications on varied surfaces', ar: 'تطبيقات على أسطح متنوعة', category: 'current' as GalleryFilter },
  { src: '/gallery/03-nakis-desenleri.png', tr: 'Desen ve nakış seçkisi', en: 'Pattern and embroidery selection', ar: 'مختارات النقوش والتطريز', category: 'current' as GalleryFilter },
  { src: '/gallery/04-uygulamalar.png', tr: 'İnce işçilik detayları', en: 'Fine craft details', ar: 'تفاصيل الحرفية الدقيقة', category: 'current' as GalleryFilter },
  { src: '/gallery/05-arsiv-01.png', tr: 'Geçmiş işlerden arşiv', en: 'Archive from past work', ar: 'أرشيف من أعمال سابقة', category: 'archive' as GalleryFilter },
  { src: '/gallery/06-arsiv-02.png', tr: 'Uğur Special tanıtım arşivi', en: 'Uğur Special archive', ar: 'أرشيف أوغور سبيشل', category: 'archive' as GalleryFilter },
  { src: '/gallery/07-arsiv-03.png', tr: 'Desen tasarım uygulama', en: 'Pattern design application', ar: 'تطبيق تصميم النقوش', category: 'archive' as GalleryFilter },
];

const address = 'Çağlayan Mah. Vatan Cad. No:68/B, Kağıthane / İstanbul';
const phone = '0532 521 07 65';
const phoneHref = 'tel:+905325210765';
const whatsappHref = 'https://wa.me/905325210765?text=Merhaba%20U%C4%9Fur%20Special%2C%20%C3%BCretim%20i%C3%A7in%20bilgi%20almak%20istiyorum.';
const mapHref = 'https://www.google.com/maps/search/?api=1&query=%C3%87a%C4%9Flayan%20Mahallesi%20Vatan%20Caddesi%20No%3A68%2FB%20Ka%C4%9F%C4%B1thane%20%C4%B0stanbul';

export default function Home() {
  const [language, setLanguage] = useState<Language>('tr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);
  const t = copy[language];
  const isArabic = language === 'ar';
  const filteredGallery = galleryItems.filter((item) => galleryFilter === 'all' || item.category === galleryFilter);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell" dir={isArabic ? 'rtl' : 'ltr'} lang={language}>
      <div className="site-noise" aria-hidden="true" />

      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>{t.hero.note}</span>
          <span className="top-strip-detail"><MapPin size={13} strokeWidth={1.8} /> İstanbul / Kağıthane / Çağlayan</span>
          <a href={phoneHref}><Phone size={13} strokeWidth={1.8} /> {phone}</a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Uğur Special ana sayfa">
            <span className="brand-logo brand-logo-only"><Image src="/logo.png" alt="Uğur Special — desen tasarım uygulama" width={1536} height={1024} /></span>
          </a>

          <nav className="desktop-nav" aria-label="Ana navigasyon">
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#gallery">{t.nav.gallery}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="header-actions">
            <label className="language-select">
              <Globe2 size={16} strokeWidth={1.8} />
              <span className="sr-only">{t.language}</span>
              <select value={language} onChange={(event) => changeLanguage(event.target.value as Language)} aria-label={t.language}>
                <option value="tr">TR</option>
                <option value="en">EN</option>
                <option value="ar">ع</option>
              </select>
              <ChevronDown size={14} strokeWidth={1.8} />
            </label>
            <a className="header-call" href={phoneHref}><Phone size={16} strokeWidth={1.9} /><span>{t.call}</span></a>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
              <span className="sr-only">Menüyü aç/kapat</span>
            </button>
          </div>
        </div>

        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobil navigasyon">
          <a href="#home" onClick={closeMenu}>{t.nav.home}</a>
          <a href="#about" onClick={closeMenu}>{t.nav.about}</a>
          <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
          <a href="#gallery" onClick={closeMenu}>{t.nav.gallery}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
          <a className="mobile-call" href={phoneHref} onClick={closeMenu}><Phone size={16} /> {phone}</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</p>
            <h1>{t.hero.lineOne}<br /><span>{t.hero.lineTwo}</span><br /><em>{t.hero.accent}</em></h1>
            <p className="hero-description">{t.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={phoneHref}>{t.hero.primary} <ArrowUpRight size={17} strokeWidth={2} /></a>
              <a className="button button-text" href="#gallery">{t.hero.secondary} <ArrowDown size={16} strokeWidth={1.8} /></a>
            </div>
            <div className="hero-trust"><span className="trust-mark"><Check size={13} strokeWidth={2.4} /></span><span>{t.hero.trusted}</span></div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-label">UĞUR SPECIAL <span>01 / 04</span></div>
            <div className="hero-image-wrap">
              <Image src="/gallery/04-uygulamalar.png" alt="Uğur Special özel dikiş ve desen uygulamaları" fill priority sizes="(max-width: 760px) calc(100vw - 66px), 520px" />
              <div className="hero-image-shade" />
              <div className="hero-image-caption"><span>TEXTILE / DETAIL</span><strong>Yüzeyde fark<br />yaratan işçilik.</strong></div>
            </div>
            <div className="experience-card"><div className="experience-number">{t.hero.experience}<sup>+</sup></div><div className="experience-copy"><span>{t.hero.experienceLabel}</span><small>Uğur Special</small></div></div>
            <div className="visual-stamp"><Sparkles size={18} /><span>DETAIL<br />MATTERS</span></div>
          </div>
        </div>
        <div className="container hero-bottom"><span className="hero-bottom-line" /><span>{t.hero.scroll}</span><span className="hero-bottom-line hero-bottom-line-short" /></div>
      </section>

      <section className="about-section section-light" id="about">
        <div className="container about-grid">
          <div className="about-intro">
            <p className="eyebrow"><span className="eyebrow-line eyebrow-line-dark" />{t.about.eyebrow}</p>
            <div className="about-number">20<span>+</span></div>
            <p className="about-number-label">{t.hero.experienceLabel}</p>
            <div className="about-rule" />
            <p className="about-label">{t.about.label}</p>
          </div>
          <div className="about-content">
            <h2>{t.about.title} <em>{t.about.accent}</em></h2>
            <p className="lead-copy">{t.about.paragraphOne}</p>
            <p>{t.about.paragraphTwo}</p>
            <blockquote>“{t.about.quote}”</blockquote>
            <div className="stat-row">{t.about.stats.map((stat) => <div className="stat" key={stat.value + stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="services-section section-ink" id="services">
        <div className="container">
          <div className="section-heading services-heading">
            <div><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{t.services.eyebrow}</p><h2>{t.services.title} <em>{t.services.accent}</em></h2></div>
            <p>{t.services.description}</p>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const descriptionKey = `${language}Description` as 'trDescription' | 'enDescription' | 'arDescription';
              return <article className="service-card" key={service.key}><div className="service-topline"><span>{service.key}</span><ArrowUpRight size={17} strokeWidth={1.7} /></div><div className="service-icon"><Scissors size={20} strokeWidth={1.4} /></div><p className="service-label">{t.services.cardLabel}</p><h3>{service[language]}</h3><p>{service[descriptionKey]}</p></article>;
            })}
          </div>
          <div className="services-footer"><span />{t.services.footer}<a href={phoneHref}>{phone} <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section className="process-section section-cream">
        <div className="container">
          <div className="section-heading process-heading"><div><p className="eyebrow"><span className="eyebrow-line eyebrow-line-dark" />{t.process.eyebrow}</p><h2>{t.process.title}</h2></div><div className="process-heading-mark"><Factory size={23} strokeWidth={1.4} /><span>FROM IDEA<br />TO PRODUCTION</span></div></div>
          <div className="process-grid">{t.process.items.map((item) => <article className="process-item" key={item.number}><span className="process-number">{item.number}</span><div className="process-icon"><ArrowUpRight size={18} strokeWidth={1.7} /></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </div>
      </section>

      <section className="gallery-section section-light" id="gallery">
        <div className="container">
          <div className="section-heading gallery-heading"><div><p className="eyebrow"><span className="eyebrow-line eyebrow-line-dark" />{t.gallery.eyebrow}</p><h2>{t.gallery.title} <em>{t.gallery.accent}</em></h2></div><p>{t.gallery.description}</p></div>

          <div className="gallery-toolbar"><div className="filter-tabs" role="tablist" aria-label={t.gallery.eyebrow}>{([['all', t.gallery.all], ['current', t.gallery.current], ['archive', t.gallery.archive]] as Array<[GalleryFilter, string]>).map(([filter, label]) => <button className={galleryFilter === filter ? 'is-active' : ''} type="button" role="tab" aria-selected={galleryFilter === filter} key={filter} onClick={() => setGalleryFilter(filter)}>{label}</button>)}</div><span className="gallery-count">{String(filteredGallery.length).padStart(2, '0')} / 07</span></div>

          <div className="gallery-grid">{filteredGallery.map((item, index) => <button className={`gallery-card gallery-card-${index + 1}`} type="button" key={item.src} onClick={() => setActiveImage(item)} aria-label={`${item[language]} - ${t.gallery.view}`}><Image src={item.src} alt={item[language]} fill sizes="(max-width: 420px) 100vw, (max-width: 760px) 50vw, (max-width: 1000px) 33vw, 25vw" /><span className="gallery-overlay" /><span className="gallery-card-content"><span className="gallery-tag">{item.category === 'archive' ? t.archiveTag : t.currentTag}</span><strong>{item[language]}</strong><span className="gallery-view"><ArrowUpRight size={16} /> {t.gallery.view}</span></span></button>)}</div>
          <p className="archive-note"><span className="archive-note-dot" />{t.gallery.archiveNote}</p>
        </div>
      </section>

      <section className="video-section section-ink">
        <div className="container video-grid">
          <div className="video-copy"><p className="eyebrow eyebrow-light"><span className="eyebrow-line" />{t.video.eyebrow}</p><h2>{t.video.title} <em>{t.video.accent}</em></h2><p>{t.video.description}</p><a className="video-link" href="https://www.youtube.com/watch?v=jpPSvx-_Sfg" target="_blank" rel="noreferrer"><span className="play-small"><Play size={14} fill="currentColor" /></span>{t.video.button}<ArrowUpRight size={16} /></a></div>
          <div className="video-frame-wrap"><div className="video-frame-top"><span>UĞUR SPECIAL / 02</span><span>WATCH</span></div><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/jpPSvx-_Sfg?rel=0&modestbranding=1" title="Uğur Special tanıtım videosu" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><div className="video-corner video-corner-tl" /><div className="video-corner video-corner-br" /></div></div>
        </div>
      </section>

      <section className="contact-section section-cream" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy"><p className="eyebrow"><span className="eyebrow-line eyebrow-line-dark" />{t.contact.eyebrow}</p><h2>{t.contact.title} <em>{t.contact.accent}</em></h2><p>{t.contact.description}</p><div className="contact-actions"><a className="button button-dark" href={phoneHref}><Phone size={17} /> {t.call}</a><a className="button button-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">{t.contact.whatsapp} <ArrowUpRight size={17} /></a></div></div>
          <div className="contact-details">
            <a className="contact-detail contact-detail-primary" href={phoneHref}><span className="detail-icon"><Phone size={19} /></span><span><small>{t.contact.callTitle}</small><strong>{phone}</strong><em>{t.contact.callDescription}</em></span><ArrowUpRight className="detail-arrow" size={18} /></a>
            <a className="contact-detail" href="mailto:info@ugurspecial.com"><span className="detail-icon"><Mail size={19} /></span><span><small>{t.contact.mailTitle}</small><strong>info@ugurspecial.com</strong></span><ArrowUpRight className="detail-arrow" size={18} /></a>
            <div className="contact-detail"><span className="detail-icon"><MapPin size={19} /></span><span><small>{t.contact.addressTitle}</small><strong>{address}</strong></span><a className="detail-inline-link" href={mapHref} target="_blank" rel="noreferrer">{t.contact.map} <ArrowUpRight size={14} /></a></div>
            <div className="contact-detail"><span className="detail-icon"><Clock3 size={19} /></span><span><small>{t.contact.hoursTitle}</small><strong>{t.contact.hours}</strong></span></div>
          </div>
        </div>
        <div className="container location-card"><div className="location-image"><Image src="/gallery/08-atelier.png" alt="Uğur Special çalışma adresi, Çağlayan" fill sizes="(max-width: 760px) 100vw, 40vw" /><span>ÇAĞLAYAN / İSTANBUL</span></div><div className="location-content"><span className="location-mark"><MapPin size={20} /></span><div><small>UĞUR SPECIAL</small><strong>{address}</strong></div><a href={mapHref} target="_blank" rel="noreferrer">{t.contact.map} <ArrowUpRight size={16} /></a></div></div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main"><a className="brand brand-footer" href="#home" aria-label="Uğur Special ana sayfa"><span className="brand-logo brand-logo-only"><Image src="/logo.png" alt="Uğur Special — desen tasarım uygulama" width={1536} height={1024} /></span></a><div className="footer-message"><strong>{t.contact.footerCta}</strong><span>{t.contact.footerDescription}</span></div><div className="footer-links"><a href="mailto:info@ugurspecial.com"><Mail size={16} /> info@ugurspecial.com</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><AtSign size={16} /> Instagram</a></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Uğur Special. Tüm hakları saklıdır.</span><span>Çağlayan · İstanbul</span></div>
      </footer>

      {activeImage && <dialog className="lightbox" open aria-label={activeImage[language]}><button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label={t.modalClose}><X size={22} /></button><div className="lightbox-content"><Image src={activeImage.src} alt={activeImage[language]} width={1400} height={950} /><div className="lightbox-caption"><span>{activeImage.category === 'archive' ? t.archiveTag : t.currentTag}</span><strong>{activeImage[language]}</strong></div></div></dialog>}
    </main>
  );
}
