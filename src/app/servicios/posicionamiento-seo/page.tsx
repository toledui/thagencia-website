import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight, 
  BarChart3, 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Zap,
  Globe,
  MapPin,
  HelpCircle
} from "lucide-react";
import { getSiteInfo } from "@/lib/wordpress";

// 1. METADATA: SEO Local + Nacional
export const metadata: Metadata = {
  title: "Agencia SEO en Querétaro y México | Posicionamiento Web Garantizado",
  description: "Aumenta tu tráfico orgánico y ventas con estrategias de SEO Técnico, Contenidos y Linkbuilding. Auditoría SEO gratuita en Querétaro.",
  keywords: [
    "Agencia SEO Querétaro",
    "Posicionamiento Web México",
    "Consultor SEO experto",
    "SEO Local Google Maps",
    "Auditoría SEO técnica"
  ],
  alternates: { canonical: "https://thagencia.com/servicios/posicionamiento-seo" }
};

export default async function SeoPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  // 2. SCHEMA: Service + FAQ
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Agencia SEO en Querétaro",
        "provider": { "@type": "ProfessionalService", "name": "THagencia", "image": "https://thagencia.com/logo.png" },
        "areaServed": ["Querétaro", "México"],
        "description": "Estrategias de posicionamiento orgánico en Google para aumentar tráfico y ventas."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿En cuánto tiempo veré resultados de SEO?",
            "acceptedAnswer": { "@type": "Answer", "text": "El SEO es una estrategia a mediano-largo plazo. Generalmente, se empiezan a ver movimientos en las primeras 4-8 semanas, pero los resultados significativos y el retorno de inversión sólido se consolidan entre el mes 4 y 6." }
          },
          {
            "@type": "Question",
            "name": "¿Garantizan la posición #1 en Google?",
            "acceptedAnswer": { "@type": "Answer", "text": "Nadie puede garantizar la posición #1 (ni siquiera Google), y desconfía de quien lo haga. Lo que garantizamos es un aumento constante en tráfico calificado, autoridad de dominio y, lo más importante, conversiones." }
          },
          {
            "@type": "Question",
            "name": "¿Qué herramientas utilizan?",
            "acceptedAnswer": { "@type": "Answer", "text": "Usamos el stack líder del mercado: Semrush para investigación de competencia, Ahrefs para backlinks, Screaming Frog para auditorías técnicas y Google Search Console para datos oficiales." }
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
      
      {/* HERO SECTION: Adaptable & High Tech */}
      <section className="relative pt-40 pb-32 px-6 md:px-16 lg:px-20 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="absolute inset-0 bg-[size:44px_44px] 
            bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] 
            dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] 
            [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        </div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-600/5 via-transparent to-transparent dark:from-orange-600/20 dark:via-transparent dark:to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400 text-sm font-bold tracking-widest uppercase mb-8">
                <TrendingUp className="w-4 h-4" />
                Crecimiento Orgánico Garantizado
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1] text-neutral-900 dark:text-white">
               Agencia SEO en <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                 Querétaro y México
               </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Deja de perseguir clientes. Haz que ellos te encuentren. Posicionamos tu marca en el <strong>Top 3 de Google</strong> para las palabras clave que generan dinero.
            </p>
            
            <a href="/contacto" className="inline-flex items-center gap-2 bg-orange-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-2xl hover:shadow-orange-600/40 text-lg group hover:-translate-y-1">
               Solicitar Auditoría Gratuita <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
            </a>
        </div>
      </section>

      {/* HERRAMIENTAS (NUEVO) */}
      <section className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-8">
                Powered by Industry Leading Tools
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Usamos texto estilizado por ahora, idealmente logos SVG */}
                <span className="text-2xl font-black font-sans">SEMRUSH</span>
                <span className="text-2xl font-black font-sans">ahrefs</span>
                <span className="text-2xl font-black font-sans">Google Search Console</span>
                <span className="text-2xl font-black font-sans">Screaming Frog</span>
                <span className="text-2xl font-black font-sans">Moz</span>
            </div>
        </div>
      </section>

      {/* EL PROBLEMA (Datos Duros) */}
      <section className="py-24 bg-white dark:bg-neutral-950 px-6 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-neutral-900 dark:text-white">¿Por qué invertir en SEO?</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Los números no mienten. El tráfico orgánico es el canal con mejor ROI.</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-6">
              <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-orange-500 transition-colors">
                 <div className="text-5xl font-black text-orange-600 mb-2">68%</div>
                 <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">De los clics van a los primeros 3 resultados.</p>
              </div>
              <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-orange-500 transition-colors">
                 <div className="text-5xl font-black text-orange-600 mb-2">40%</div>
                 <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Del tráfico total web viene de búsquedas orgánicas.</p>
              </div>
              <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-orange-500 transition-colors">
                 <div className="text-5xl font-black text-orange-600 mb-2">3x</div>
                 <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Más retorno de inversión que los anuncios pagados.</p>
              </div>
              <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-orange-500 transition-colors">
                 <div className="text-5xl font-black text-orange-600 mb-2">24/7</div>
                 <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Tu web genera clientes mientras duermes.</p>
              </div>
           </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-24 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto bg-neutral-50 dark:bg-neutral-900/30 rounded-3xl my-20">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-neutral-900 dark:text-white">Nuestra Metodología Probada</h2>
        <div className="grid md:grid-cols-3 gap-12">
           {/* Paso 1 */}
           <div className="relative pl-8 border-l-2 border-orange-200 dark:border-orange-900">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-600 ring-4 ring-white dark:ring-neutral-900"></span>
              <Search className="w-10 h-10 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">1. Auditoría Forense</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                 Analizamos tu sitio a nivel de código. Encontramos los errores técnicos (velocidad, indexación, schema) que impiden que Google te lea correctamente.
              </p>
              <ul className="text-sm text-neutral-500 space-y-1 list-disc list-inside">
                 <li>Core Web Vitals</li>
                 <li>Indexación y Crawling</li>
                 <li>Arquitectura de URLs</li>
              </ul>
           </div>

           {/* Paso 2 */}
           <div className="relative pl-8 border-l-2 border-orange-200 dark:border-orange-900">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-600 ring-4 ring-white dark:ring-neutral-900"></span>
              <Target className="w-10 h-10 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">2. Estrategia de Contenidos</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                 No escribimos por escribir. Creamos "Clusters de Contenido" diseñados para responder las dudas de tus clientes en cada etapa de compra.
              </p>
              <ul className="text-sm text-neutral-500 space-y-1 list-disc list-inside">
                 <li>Keyword Research</li>
                 <li>Intención de Búsqueda</li>
                 <li>Optimización Semántica</li>
              </ul>
           </div>

           {/* Paso 3 */}
           <div className="relative pl-8 border-l-2 border-orange-200 dark:border-orange-900">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-600 ring-4 ring-white dark:ring-neutral-900"></span>
              <BarChart3 className="w-10 h-10 text-orange-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">3. Autoridad (Off-Page)</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                 Conseguimos enlaces de calidad (Backlinks) de sitios relevantes que le dicen a Google que tu sitio es una autoridad en el sector.
              </p>
              <ul className="text-sm text-neutral-500 space-y-1 list-disc list-inside">
                 <li>Linkbuilding White-Hat</li>
                 <li>Relaciones Públicas Digitales</li>
                 <li>SEO Local (Google Maps)</li>
              </ul>
           </div>
        </div>
      </section>

      {/* LO QUE INCLUYE (Checklist) */}
      <section className="py-20 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center text-neutral-900 dark:text-white">Plan Integral de Posicionamiento</h2>
        <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
           {[
              "Auditoría SEO técnica completa",
              "Investigación de 100+ palabras clave",
              "Análisis de competencia a fondo",
              "Estrategia de contenidos mensual",
              "Redacción y optimización de artículos",
              "Link building de alta autoridad (DA 30+)",
              "Reportes mensuales de rendimiento",
              "Asesoría estratégica trimestral",
              "Optimización on-page (meta tags, h1, etc)",
              "Implementación de Schema Markup",
              "Setup de Google Search Console",
              "Monitoreo de rankings 24/7"
           ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                 <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                 <p className="text-neutral-700 dark:text-neutral-300 font-medium text-lg">{item}</p>
              </div>
           ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 md:px-16 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-neutral-900 dark:text-white">Preguntas Frecuentes</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Resolvemos tus dudas sobre el posicionamiento web.</p>
        </div>
        
        <div className="space-y-6">
            {[
                { 
                    q: "¿En cuánto tiempo veré resultados?", 
                    a: "El SEO es una estrategia a mediano plazo. Los primeros movimientos se ven en las semanas 4-8, pero los resultados sólidos de tráfico y ventas suelen consolidarse entre el mes 4 y 6. Es una inversión compuesta." 
                },
                { 
                    q: "¿Garantizan la posición #1 en Google?", 
                    a: "Cuidado con quien te prometa eso. Nadie controla el algoritmo de Google al 100%. Lo que garantizamos es la implementación de las mejores prácticas, aumento de tráfico calificado y crecimiento constante en autoridad." 
                },
                { 
                    q: "¿Hacen SEO Local para Querétaro?", 
                    a: "Sí, somos expertos en SEO Local. Optimizamos tu ficha de Google My Business, conseguimos citas locales y aseguramos que aparezcas cuando alguien busca tus servicios en tu ciudad." 
                },
                { 
                    q: "¿Necesito tener una web nueva?", 
                    a: "No necesariamente. Si tu web actual tiene una buena base técnica, podemos trabajar sobre ella. Si la auditoría revela problemas estructurales graves, te recomendaremos una migración o rediseño para no desperdiciar el esfuerzo SEO." 
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
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 md:px-16 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6">¿Tu competencia te está ganando?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Cada día que no estás en la primera página, estás perdiendo dinero. Hagamos una auditoría y recuperemos ese tráfico.
          </p>
          <a href="/contacto" className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl font-black hover:bg-neutral-100 transition-all shadow-2xl hover:shadow-white/20 text-lg group">
            Empezar Auditoría Ahora <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}