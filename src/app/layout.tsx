import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/layout/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OLENE – Sommer-Outfits für Mädchen 2025',
  description:
    'Entdecke die heißesten Sommer-Looks 2025. Kleider, Sets, Tops und mehr für junge Frauen. Modisch, trendig, hochwertig.',
  keywords: ['Sommermode', 'Kleider', 'Sets', 'Mädchen', 'Sommer 2025', 'Fashion', 'Online Shop'],
  openGraph: {
    title: 'OLENE – Sommer-Outfits 2025',
    description: 'Die heißesten Sommer-Looks für Mädchen & junge Frauen',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-brand-black text-white">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
