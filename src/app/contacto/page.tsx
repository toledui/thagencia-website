import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteInfo } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - THagencia",
  description: "Ponte en contacto con THagencia. Estamos aquí para ayudarte con tu proyecto de desarrollo web en Querétaro.",
  keywords: "Contacto, THagencia, Desarrollo Web, Querétaro",
};

export default async function ContactPage() {
  const siteInfo = await getSiteInfo().catch(() => null);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto THagencia",
    description: "Inicia tu proyecto digital con THagencia. Desarrollo Web, Sistemas a la medida y SEO en Querétaro.",
    url: "https://thagencia.com/contacto",
    mainEntity: {
      "@type": "ProfessionalService",
      "@id": "https://thagencia.com/#organization",
      name: "THagencia",
      telephone: "+529656976675",
      email: "ventas@thagencia.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+52-965-697-6675",
          contactType: "sales",
          areaServed: ["MX"],
          availableLanguage: ["es", "en"],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 md:px-16 lg:px-20 py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
        {/* Mesh / Grid background similar to Manifest */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-72 h-72 bg-orange-600/10 blur-3xl rounded-full" />
        <div className="absolute -right-24  top-10 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase">
                // Ponte en contacto
              </h3>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
                HABLEMOS{' '}<br />{' '}DE TU{' '}<br />{' '}PROYECTO
              </h1>
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-xl leading-relaxed">
                ¿Tienes una idea o necesitas mejorar tu presencia digital? Nuestro equipo está listo para convertir tu visión en realidad.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/5219656976675?text=Hola%20THagencia%2C%20me%20gustaría%20conocer%20más%20sobre%20vuestros%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="mailto:ventas@thagencia.com"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold hover:border-orange-600 hover:text-orange-600 transition-colors"
                >
                  ✉️ ventas@thagencia.com
                </a>
              </div>
            </div>

            {/* Visual tile reminiscent of Manifest */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-neutral-600 rounded-3xl blur opacity-25" />
              <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />
                <div className="p-8 md:p-10 space-y-6 relative z-10">
                  <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-mono">Equipo THagencia</p>
                  <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                    Cada proyecto inicia con una conversación
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Cuéntanos tu reto y diseñaremos un plan claro: stack, roadmap y métricas de éxito.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-600/10 border border-orange-200 dark:border-orange-900 flex items-center justify-center text-2xl">
                      🤝
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Respuesta promedio</p>
                      <p className="text-lg font-bold text-neutral-900 dark:text-white">&lt; 1 hora en horario laboral</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="px-3 py-1 rounded-full bg-orange-600/10 text-orange-700 dark:text-orange-300 text-xs font-semibold">Discovery call</span>
                    <span className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold">Roadmap</span>
                    <span className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold">Stack adecuado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="px-6 md:px-16 lg:px-20 py-16 md:py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            {/* FORMULARIO */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-8">
                Envíanos un{' '}<br />{' '}mensaje
              </h2>
              <ContactForm />
            </div>

            {/* INFORMACIÓN DE CONTACTO */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 md:px-20 py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center p-12 md:p-16 rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4">
              ¿Necesitas respuesta rápida?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
              Comunícate directamente por WhatsApp. Estamos disponibles de lunes a viernes, 9 AM - 6 PM (Hora Centro).
            </p>
            <a
              href="https://wa.me/5219656976675?text=Hola%20THagencia%2C%20me%20gustaría%20conocer%20más%20sobre%20vuestros%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 group"
            >
              <span>💬 Escribir por WhatsApp</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
