import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SUPDATE — Hör auf, Ziele zu setzen. Fang an, sie zu halten.',
  description: 'SUPDATE bringt wöchentliche Accountability in deine Gruppe — strukturiert, respektvoll, wirksam.',
  openGraph: {
    title: 'SUPDATE — Accountability die funktioniert',
    description: 'Wöchentliche Check-ins. Klare Regeln. Echte Ergebnisse.',
    url: 'https://sup.date',
    siteName: 'SUPDATE',
    locale: 'de_AT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUPDATE',
    description: 'Hör auf, Ziele zu setzen. Fang an, sie zu halten.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
