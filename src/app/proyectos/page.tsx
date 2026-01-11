import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { getPortfolioProjects, getSiteInfo } from "@/lib/wordpress";

// Revalida cada hora (3600s) porque los proyectos cambian con menor frecuencia
export const revalidate = 3600;

// 1. METADATOS SEO OPTIMIZADOS
export const metadata: Metadata = {
  title: "Portafolio de Desarrollo Web y Sistemas | THagencia",
  description: "Explora nuestros casos de éxito en desarrollo web, tiendas en línea y sistemas a la medida en Querétaro y México. Resultados reales.",
  alternates: {
    canonical: "https://thagencia.com/proyectos", // <--- ¡CRUCIAL PARA NO SER CONTENIDO DUPLICADO!
  },
  openGraph: {
    title: "Portafolio de Desarrollo Web y Sistemas | THagencia",
    description: "Casos reales de transformación digital. Ver proyectos.",
    url: "https://thagencia.com/proyectos",
    siteName: "THagencia",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://thagencia.com/uploads/images/thagencia-logo.jpg", // Idealmente cambia esto por una imagen collage de tus trabajos
        width: 1200,
        height: 630,
        alt: "Portafolio THagencia",
      },
    ],
  },
};

export default async function ProjectsPage() {
  // 2. OBTENCIÓN DE DATOS (Tu lógica original)
  const [siteInfo, projects] = await Promise.all([
    getSiteInfo().catch(() => null),
    getPortfolioProjects(200).catch(() => []),
  ]);

  const categories = Array.from(
    new Set(
      projects
        .map((p) => p.category)
        .filter((c): c is string => Boolean(c))
    )
  );

  // 3. SCHEMA DINÁMICO (CollectionPage)
  // Le dice a Google que esto es una lista de tus trabajos
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portafolio de THagencia",
    "description": "Colección de proyectos de desarrollo web y sistemas realizados por THagencia.",
    "url": "https://thagencia.com/proyectos",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.slice(0, 10).map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://thagencia.com/portafolio/${project.slug}`,
        "name": project.title,
        ...(project.image && { "image": project.image })
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      
      {/* Inyección del Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <main className="pt-32 pb-20 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-12">
          {/* 4. H1 OPTIMIZADO PARA PALABRAS CLAVE */}
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            // Casos de Éxito
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-neutral-900 dark:text-white">
            Portafolio de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
              Desarrollo & Sistemas
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Casos reales de <strong>desarrollo web</strong>, <strong>sistemas a medida</strong> y productos digitales que impulsan negocios.
          </p>
        </div>

        <ProjectsGallery projects={projects} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}