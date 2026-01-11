import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingTable } from "@/components/PricingTable"; // <--- IMPORTAMOS EL COMPONENTE
import { 
  ArrowRight, 
  ShoppingBag, 
  GraduationCap, 
  Building2, 
  Briefcase,
  LayoutTemplate,
  Code2,
  Database,
  Smartphone,
  Globe,
  HelpCircle,
  Zap,
  MousePointerClick
} from "lucide-react";
import { getSiteInfo } from "@/lib/wordpress";

// 1. METADATA: Full SEO Local
export const metadata: Metadata = {
  title: "Diseño de Páginas Web en Querétaro | Agencia de Desarrollo Web",
  description: "Agencia de diseño web en Querétaro. Creamos sitios web corporativos, tiendas en línea y landing pages que cargan en <1s y generan ventas.",
  keywords: [
    "Diseño web Querétaro",
    "Desarrollo de páginas web Querétaro",
    "Agencia de marketing digital Querétaro",
    "Tiendas en línea Querétaro",
    "Diseño UX UI México"
  ],
  alternates: { canonical: "https://thagencia.com/servicios/diseno-web" }
};

export default async function DisenoWebPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  // 2. SCHEMA FAQ + SERVICE
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Diseño de Páginas Web en Querétaro",
        "provider": { "@type": "ProfessionalService", "name": "THagencia", "image": "https://thagencia.com/logo.png" },
        "areaServed": { "@type": "City", "name": "Querétaro" },
        "description": "Desarrollo de sitios web de alto rendimiento y tiendas en línea."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cuánto cuesta una página web en Querétaro?",
            "acceptedAnswer": { "@type": "Answer", "text": "Depende del alcance. Una Landing Page profesional comienza desde $XX, mientras que un E-commerce o Sistema a la medida requiere una cotización personalizada basada en funcionalidades." }
          },
          {
            "@type": "Question",
            "name": "¿Cuánto tiempo tardan en entregar?",
            "acceptedAnswer": { "@type": "Answer", "text": "Proyectos corporativos toman entre 2 a 4 semanas. Tiendas en línea y sistemas complejos pueden tomar de 6 a 12 semanas. Trabajamos con sprints ágiles." }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />
      
      {/* HERO SECTION: ADAPTABLE (Light & Dark) */}
      <section className="relative pt-40 pb-32 px-6 md:px-16 lg:px-20 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        
        {/* Background Grid Effects (Adaptativo) */}
        <div className="absolute inset-0 bg-[size:44px_44px] 
            bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] 
            dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] 
            [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
        
        {/* Glow Superior */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-600/5 via-transparent to-transparent dark:from-orange-600/20 dark:via-transparent dark:to-transparent blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                border border-orange-200 bg-orange-50 text-orange-700 
                dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400 
                text-sm font-bold tracking-widest uppercase mb-8">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Agencia #1 en Querétaro
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1] text-neutral-900 dark:text-white">
                Diseño de Páginas Web <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                    Que Venden 24/7
                </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Deje de perder clientes con una web lenta y fea. Diseñamos <strong>ecosistemas digitales de alto rendimiento</strong> enfocados en facturación, no solo en "likes".
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a href="/contacto" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-orange-600 text-white font-bold text-lg rounded-xl hover:bg-orange-700 transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.3)] hover:shadow-[0_0_60px_-15px_rgba(234,88,12,0.6)] hover:-translate-y-1">
                    Cotizar Proyecto Ahora <ArrowRight className="w-6 h-6"/>
                </a>
                <a href="/proyectos" className="inline-flex items-center justify-center gap-3 px-8 py-5 border border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:bg-transparent dark:hover:bg-neutral-800 font-bold text-lg rounded-xl transition-all">
                    Ver Casos de Éxito
                </a>
            </div>

            {/* Social Proof Mini */}
            <div className="mt-16 pt-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 dark:opacity-70 grayscale hover:grayscale-0 transition-all duration-500 text-neutral-400 dark:text-neutral-500">
                <span className="text-xl font-bold font-mono">EMPRESAS</span>
                <span className="text-xl font-bold font-mono">INDUSTRIA</span>
                <span className="text-xl font-bold font-mono">ECOMMERCE</span>
                <span className="text-xl font-bold font-mono">STARTUPS</span>
            </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-10">
                Stack Tecnológico de Última Generación
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                 {[
                    { icon: Code2, label: "Next.js 14" },
                    { icon: Zap, label: "React" },
                    { icon: Database, label: "PostgreSQL" },
                    { icon: LayoutTemplate, label: "Tailwind CSS" },
                    { icon: Globe, label: "WordPress Headless" },
                    { icon: ShoppingBag, label: "Shopify" },
                    { icon: Smartphone, label: "PWA Mobile" },
                ].map((tech, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <tech.icon className="w-5 h-5 text-orange-600" />
                        <span className="font-bold text-neutral-700 dark:text-neutral-300">{tech.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* TIPOS DE SITIOS (SECTORIZADO) */}
      <section className="py-24 bg-white dark:bg-neutral-900/30 px-6 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">Soluciones para tu Industria</h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    No usamos plantillas genéricas. Adaptamos la tecnología a las necesidades específicas de tu modelo de negocio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* E-commerce */}
                <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">E-commerce</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Tiendas en línea robustas diseñadas para vender. Pasarelas de pago, envíos y facturación automática.
                    </p>
                </div>

                {/* Inmobiliarias */}
                <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Inmobiliarias</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Portales con buscadores avanzados, mapas interactivos, recorridos 360° y CRM inmobiliario integrado.
                    </p>
                </div>

                {/* Corporativos */}
                <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Corporativos B2B</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Sitios institucionales que transmiten autoridad y confianza. Ideales para constructoras y servicios industriales.
                    </p>
                </div>

                {/* Academias */}
                <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mb-6 text-yellow-600 group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Academias (LMS)</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Vende tus cursos online. Plataformas con áreas de miembros, control de progreso y certificados automáticos.
                    </p>
                </div>

                {/* Landing Pages */}
                <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:scale-110 transition-transform">
                        <MousePointerClick className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Landing Pages</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Páginas de aterrizaje de alta conversión diseñadas específicamente para campañas de Google Ads.
                    </p>
                </div>

                 {/* Blogs */}
                 <div className="group bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-600 transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                        <LayoutTemplate className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">Blogs & Medios</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm leading-relaxed">
                        Portales de contenido optimizados para SEO y AdSense. Carga instantánea para retener lectores.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* AQUÍ INSERTAMOS LA TABLA DE PRECIOS */}
      <div id="precios">
        <PricingTable />
      </div>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 md:px-16 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-neutral-900 dark:text-white">Preguntas Frecuentes</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Todo lo que necesitas saber antes de iniciar tu proyecto web.</p>
        </div>
        
        <div className="space-y-6">
            {[
                { 
                    q: "¿Cuánto cuesta una página web?", 
                    a: "No existe un precio único porque no hay dos negocios iguales. Una Landing Page simple puede rondar los $5,000, mientras que un E-commerce complejo requiere una inversión mayor. Lo importante es que diseñamos para que recuperes esa inversión." 
                },
                { 
                    q: "¿Qué incluye el servicio de diseño web?", 
                    a: "Incluye todo: Investigación de mercado, diseño UX/UI, desarrollo del código, optimización SEO técnica, configuración de dominio/hosting y capacitación para que puedas editar textos o precios tú mismo." 
                },
                { 
                    q: "¿Cuánto tiempo tardan en terminar?", 
                    a: "Para sitios corporativos o Landing Pages, el tiempo promedio es de 2 a 3 semanas. Para E-commerce o sistemas a medida, puede variar de 5 a 8 semanas dependiendo de la complejidad." 
                },
                { 
                    q: "¿Tengo que pagar mensualidades?", 
                    a: "No por el diseño. El sitio es 100% tuyo tras el pago final. Los únicos costos recurrentes son externos (tu dominio anual y tu hosting), aunque ofrecemos planes de mantenimiento opcionales si quieres que nosotros lo gestionemos." 
                },
                { 
                    q: "¿El sitio estará optimizado para Google (SEO)?", 
                    a: "Absolutamente. No entregamos 'cáscaras vacías'. Tu sitio se entrega con estructura semántica, metaetiquetas, sitemap y optimización de velocidad para que Google lo ame desde el día uno." 
                }
            ].map((faq, i) => (
                <div key={i} className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900/30 shadow-sm">
                    <h3 className="font-bold text-lg mb-3 flex items-start gap-3 text-neutral-900 dark:text-white">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        {faq.q}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 pl-9 leading-relaxed">
                        {faq.a}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-orange-600 text-white px-6 md:px-16 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8">¿Tu web actual no vende?</h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-medium">
            Es hora de tener una plataforma profesional. Agenda una consulta gratis y analicemos tu caso hoy mismo.
          </p>
          <a href="/contacto" className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black hover:bg-neutral-100 transition-all shadow-2xl hover:shadow-white/20 text-lg group">
            Solicitar Auditoría Web <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}