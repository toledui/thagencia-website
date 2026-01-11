import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogWithFilter } from "@/components/BlogWithFilter";
import { getSiteInfo, getPosts } from "@/lib/wordpress";
import { Sparkles } from "lucide-react";

// Revalida (consulta WP) cada 10 minutos al recibir visitas
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog de Desarrollo Web y SEO | THagencia",
  description: "Artículos sobre desarrollo web, posicionamiento SEO, tecnología y estrategias digitales. Conocimiento práctico para tu negocio.",
  keywords: [
    "Blog desarrollo web",
    "Artículos SEO",
    "Tecnología web",
    "Estrategias digitales",
    "WordPress",
    "Next.js",
  ],
  alternates: {
    canonical: "https://thagencia.com/blog",
  },
  openGraph: {
    title: "Blog | THagencia",
    description: "Artículos y recursos sobre desarrollo web, SEO y tecnología.",
    url: "https://thagencia.com/blog",
    type: "website",
    images: [
      {
        url: "https://thagencia.com/wp-content/uploads/2023/09/logo-THagencia2.png",
        width: 1200,
        height: 630,
        alt: "THagencia Blog",
      },
    ],
  },
};

export default async function BlogPage() {
  const [siteInfo, posts] = await Promise.all([
    getSiteInfo().catch(() => null),
    getPosts(100).catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 lg:px-20 overflow-hidden">
        {/* Mesh Background */}
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/20 mb-8">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                Conocimiento & Recursos
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8">
              Blog de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                Desarrollo Web
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Artículos, tutoriales y recursos sobre desarrollo web, SEO, tecnología 
              y estrategias digitales que realmente funcionan.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <BlogWithFilter posts={posts} />

      <Footer />
    </div>
  );
}
