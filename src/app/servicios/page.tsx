import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesGrid } from "@/components/ServicesGrid";
import { getSiteInfo } from "@/lib/wordpress";
// Importamos el componente cliente que acabamos de crear
import { ServicesHero } from "@/components/ServicesHero"; 

// 1. METADATA (Ahora sí funciona porque es un Server Component)
export const metadata: Metadata = {
  title: "Servicios de Desarrollo Web y SEO en Querétaro | THagencia",
  description: "Diseño de páginas web, desarrollo de sistemas a la medida y posicionamiento SEO. Soluciones digitales que impulsan tu negocio en Querétaro.",
  keywords: ["Servicios desarrollo web", "Sistemas a la medida", "Agencia SEO", "E-commerce", "App Web"],
  alternates: {
    canonical: "https://thagencia.com/servicios",
  },
  openGraph: {
    title: "Servicios de Desarrollo Web y SEO | THagencia",
    description: "Ingeniería de software aplicada a negocios. Ver servicios.",
    url: "https://thagencia.com/servicios",
    images: [{ url: "https://thagencia.com/uploads/images/thagencia-logo.jpg", width: 1200, height: 630 }],
  },
};

export default async function ServiciosPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  // 2. SCHEMA JSON-LD
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Desarrollo Web a la Medida",
          "description": "Sistemas ERP, CRM y plataformas SaaS personalizadas.",
          "provider": { "@id": "https://thagencia.com/#organization" }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Diseño de Páginas Web",
          "description": "Sitios corporativos y Landing Pages de alta conversión.",
          "provider": { "@id": "https://thagencia.com/#organization" }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Posicionamiento SEO",
          "description": "Estrategias de posicionamiento orgánico en Google.",
          "provider": { "@id": "https://thagencia.com/#organization" }
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      
      {/* Inyección de Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      {/* Aquí cargamos el componente cliente con las animaciones */}
      <ServicesHero />

      <ServicesGrid />

      {/* CTA Final */}
      <section className="py-20 px-6 md:px-16 lg:px-20 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            ¿Listo para escalar tu operación?
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            No vendemos "sitios web", vendemos <strong>herramientas de negocio</strong>. Agenda una sesión de consultoría gratuita de 30 minutos.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-xl hover:shadow-orange-600/30 text-lg group"
          >
            <span>Agendar Consultoría</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}