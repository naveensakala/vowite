import '../styles/globals.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://vowite.com'),
  title: {
    default: 'Vowite — Beautiful Digital Wedding Invitations',
    template: '%s | Vowite',
  },
  description: 'Create stunning interactive digital wedding invitations for Indian weddings. Share your love story with beautifully designed e-invites.',
  keywords: ['wedding invitation', 'digital wedding invite', 'Indian wedding', 'e-invite', 'online wedding card'],
  authors: [{ name: 'Vowite' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vowite.com',
    siteName: 'Vowite',
    title: 'Vowite — Beautiful Digital Wedding Invitations',
    description: 'Create stunning interactive digital wedding invitations for Indian weddings.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vowite — Digital Wedding Invitations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vowite — Beautiful Digital Wedding Invitations',
    description: 'Create stunning interactive digital wedding invitations for Indian weddings.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}