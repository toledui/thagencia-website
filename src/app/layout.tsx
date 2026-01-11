import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const siteUrl = "https://thagencia.com";
const logoPath = "/uploads/images/thagencia-logo.jpg";

export const metadata: Metadata = {
  title: "THagencia | Desarrollo Web en Querétaro",
  description: "Agencia de Desarrollo Web en Querétaro. Sistemas a la Medida, Diseño de Páginas Web y SEO. Tu Partner Tecnológico.",
  keywords: "Desarrollo Web Querétaro, Agencia de Desarrollo, Sistemas ERP, Posicionamiento SEO, Diseño Web",
  icons: {
    icon: [
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/uploads/images/favicon/favicon-96x96.png" },
      { rel: "icon", type: "image/svg+xml", url: "/uploads/images/favicon/favicon.svg" },
      { rel: "shortcut icon", url: "/uploads/images/favicon/favicon.ico" },
    ],
    apple: { url: "/uploads/images/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/uploads/images/favicon/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "THagencia",
  },
};

// JSON-LD Schema para SEO profesional
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://thagencia.com/#organization",
  "name": "THagencia",
  "alternateName": ["TH Agencia", "TH Agencia de Desarrollo Web"],
  "url": "https://thagencia.com",
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}${logoPath}`,
    "width": 1200,
    "height": 630
  },
  "image": `${siteUrl}${logoPath}`,
  "description": "Agencia de desarrollo web y posicionamiento SEO en Querétaro. Expertos en Sistemas a la Medida y Marketing Digital.",
  "telephone": "+529656976675",
  "email": "ventas@thagencia.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "El Marqués",
    "addressRegion": "Querétaro",
    "postalCode": "76240",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.588793",
    "longitude": "-100.389888"
  },
  "areaServed": [
    "Querétaro",
    "El Marqués",
    "Juriquilla",
    "Corregidora",
    "San Juan del Río",
    "Bajío",
    "México"
  ],
  "priceRange": "$$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/thagencia.qro",
    "https://www.youtube.com/@WebDevLuis",
    "https://www.tiktok.com/@thagencia"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <CookieBanner />
        <FloatingCTA />
      </body>
      {/* Google Analytics condicionado al consentimiento */}
      <ConsentAnalytics />
    </html>
  );
}
