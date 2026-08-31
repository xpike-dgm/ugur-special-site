import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Uğur Special | Desen Tasarım Uygulama',
  description: 'Çağlayan, İstanbul’da tekstil üreticileri için desen tasarım, nakış ve special dikiş uygulamaları.',
  openGraph: {
    title: 'Uğur Special | Desen Tasarım Uygulama',
    description: 'Kumaşa karakter, üretime güç. Çağlayan’da tekstil üreticileri için özel uygulamalar.',
    type: 'website',
    locale: 'tr_TR',
    images: ['/gallery/04-uygulamalar.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uğur Special | Desen Tasarım Uygulama',
    description: 'Kumaşa karakter, üretime güç.',
    images: ['/gallery/04-uygulamalar.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
