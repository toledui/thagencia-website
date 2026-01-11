import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Manifest } from "@/components/Manifest";
import { Services } from "@/components/Services";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { SEOBlock } from "@/components/SEOBlock";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingCTA } from "@/components/FloatingCTA";
import { LatestPosts } from "@/components/LatestPosts";
import { getPosts, getSiteInfo, getPortfolioProjects } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Desarrollo de Páginas Web en Querétaro | Sistemas y SEO | THagencia",
  description:
    "Agencia experta en Desarrollo Web y Sistemas a la Medida en Querétaro. Creamos sitios rápidos, tiendas en línea y estrategias SEO que venden.",
  keywords: [
    "Páginas web en Querétaro",
    "Desarrollo web Querétaro",
    "Agencia SEO Querétaro",
    "Sistemas a la medida",
  ],
  alternates: {
    canonical: "https://thagencia.com",
  },
  openGraph: {
    title: "Desarrollo de Páginas Web en Querétaro | THagencia",
    description:
      "Transformamos tu negocio con tecnología. Desarrollo Web, Sistemas ERP y SEO en Querétaro.",
    url: "https://thagencia.com",
    siteName: "THagencia",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://thagencia.com/uploads/images/thagencia-logo.jpg",
        width: 1200,
        height: 630,
        alt: "THagencia Desarrollo Web",
      },
    ],
  },
};

export default async function Home() {
  const [siteInfo, posts, projects] = await Promise.all([
    getSiteInfo().catch(() => null),
    getPosts(3).catch(() => []),
    getPortfolioProjects(4).catch(() => []),
  ]);

  return (
    <div className="bg-neutral-950 min-h-screen text-white overflow-x-hidden font-sans relative antialiased">
      <CustomCursor />
      <FloatingCTA />
      <JsonLd />
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />
      <Hero />
      <TechStack />
      <Manifest logoUrl={siteInfo?.logo?.url} />
      <Services />
      <PortfolioShowcase projects={projects} />
      <LatestPosts posts={posts} />
      <SEOBlock />
      <FAQ />
      <Footer />
    </div>
  );
}
