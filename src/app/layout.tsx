import type { Metadata, Viewport } from 'next';
import { Oswald, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/siteConfig';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import CookieConsent from '@/components/layout/CookieConsent';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} | Tatuador em Ceilândia, Brasília-DF - Black Work & Preto e Cinza`,
  description: `${siteConfig.name} - Estúdio de tatuagem em Ceilândia, Brasília-DF. Tatuador profissional desde 2018 especialista em Black Work, Preto e Cinza e projetos autorais. Agende sua sessão online com hora marcada.`,
  keywords: [
    'tatuador em ceilândia',
    'tatuagem brasília df',
    'edy alves tattoo',
    'black work ceilândia',
    'preto e cinza brasília',
    'estúdio de tatuagem ceilândia',
    'melhor tatuador ceilândia',
    'agendamento tatuagem df',
    'cover up tatuagem brasília',
    'tatuagem autoral df',
  ],
  authors: [{ name: 'Edy Alves', url: siteConfig.contact.instagramUrl }],
  creator: 'Edy Alves Tattoo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://edyalvestattoo.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: `${siteConfig.name} | Tatuador em Ceilândia, Brasília-DF`,
    description: 'Tatuagem autoral em Black Work e Preto e Cinza com traço limpo, biossegurança rigorosa e hora marcada.',
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/hero-tattoo-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Edy Alves Tattoo - Tatuador em Ceilândia, Brasília-DF',
      },
      {
        url: '/images/edy-portrait.png',
        width: 800,
        height: 800,
        alt: 'Edy Alves - Tatuador desde 2018',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Tatuador em Ceilândia, Brasília-DF`,
    description: 'Especialista em Black Work e Preto e Cinza. Agende sua sessão online.',
    images: ['/images/hero-tattoo-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD Structured Data for LocalBusiness & TattooParlor
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TattooParlor'],
    '@id': 'https://edyalvestattoo.com.br/#business',
    name: siteConfig.name,
    image: [
      'https://edyalvestattoo.com.br/images/edy-portrait.png',
      'https://edyalvestattoo.com.br/images/hero-tattoo-bg.jpg',
    ],
    telephone: siteConfig.contact.phone,
    url: 'https://edyalvestattoo.com.br',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: 'Ceilândia',
      addressRegion: 'DF',
      postalCode: siteConfig.contact.address.cep,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.coordinates.latitude,
      longitude: siteConfig.contact.coordinates.longitude,
    },
    hasMap: siteConfig.contact.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      siteConfig.contact.instagramUrl,
      siteConfig.contact.googleMapsUrl,
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${oswald.variable} ${inter.variable} ${cinzel.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Analytics hooks (Google Analytics 4 & Meta Pixel) if env vars present */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#0D0D0D] text-[#B5B5B5] antialiased selection:bg-[#E8153B] selection:text-white flex flex-col relative">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <CookieConsent />
      </body>
    </html>
  );
}
