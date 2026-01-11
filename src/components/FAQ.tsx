"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// DATOS SEO OPTIMIZADOS (Keywords: Páginas web Querétaro, Desarrollo, Soporte)
const seoFaqs = [
  {
    q: "¿Cuánto cuesta el desarrollo de una página web en Querétaro con ustedes?",
    a: "El costo varía según la complejidad. No es lo mismo una Landing Page para captar leads que un sistema ERP a la medida. Sin embargo, en THagencia ofrecemos soluciones escalables diseñadas para el mercado de Querétaro, asegurando que tu inversión genere un retorno (ROI) real. Contáctanos para una cotización personalizada en menos de 24 horas.",
  },
  {
    q: "¿Por qué elegir una agencia de desarrollo web local en el Bajío?",
    a: "Entendemos el ecosistema industrial y comercial de Querétaro y el Bajío. A diferencia de plantillas genéricas o freelancers remotos, nosotros somos un partner tecnológico que puede reunirse contigo, entender tu operación y ofrecer soporte técnico local inmediato.",
  },
  {
    q: "¿Qué incluye su servicio de Diseño de Páginas Web?",
    a: "Nuestros desarrollos son 'llave en mano'. Incluyen: Diseño UX/UI personalizado (no plantillas), optimización de velocidad (Core Web Vitals), estructura SEO para Google, integración con sistemas externos si lo requieres, certificado de seguridad SSL y capacitación para que puedas autoadministrar tu contenido.",
  },
  {
    q: "¿Cuánto tiempo tarda en desarrollarse un sistema o sitio web?",
    a: "Una página web corporativa o Landing Page suele estar lista en 2 a 3 semanas. Para desarrollos de software a la medida (Sistemas de facturación, Intranets, ERPs), el tiempo depende de los módulos requeridos, pero trabajamos con metodologías ágiles (Scrum) para entregarte avances funcionales quincenalmente.",
  },
  {
    q: "¿Sus sitios web están optimizados para SEO (Posicionamiento en Google)?",
    a: "Absolutamente. No concebimos el desarrollo web sin SEO. Desde la primera línea de código, estructuramos tu sitio (H1, Metadatos, Schema, Sitemap) para que Google lo indexe correctamente. Nuestro objetivo es que aparezcas cuando tus clientes busquen tus servicios en Querétaro. Optimizado para IA's.",
  },
  {
    q: "¿Ofrecen facturación y soporte técnico para empresas?",
    a: "Sí. Somos una agencia constituida formalmente en México. Emitimos facturas fiscales (CFDI) y todos nuestros proyectos incluyen un periodo de garantía y soporte técnico prioritario para asegurar que tu operación digital nunca se detenga.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(0); // El primero abierto por defecto invita a leer

  // Generación de Schema.org para Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación Header
      gsap.from(".faq-header-anim", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animación Items (Cascada)
      gsap.from(".faq-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 px-6 md:px-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* Inyección de Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="faq-header-anim mb-16 text-center">
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            // Dudas Comunes
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white transition-colors duration-300">
            PREGUNTAS{' '}<br />FRECUENTES
          </h2>
          <p className="mt-6 text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Resolvemos tus dudas sobre procesos, costos y tecnología antes de empezar. Transparencia total desde el primer contacto.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="faq-container space-y-4">
          {seoFaqs.map((faq, idx) => (
            <div
              key={idx}
              className={`
                faq-item group border-l-4 transition-all duration-300 cursor-pointer overflow-hidden
                ${activeIdx === idx 
                  ? "border-orange-600 bg-white dark:bg-neutral-900 shadow-xl scale-[1.02]" 
                  : "border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 hover:border-orange-600/50 hover:bg-white dark:hover:bg-neutral-900"
                }
              `}
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            >
              {/* Question Header */}
              <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 flex-1 ${
                  activeIdx === idx 
                    ? "text-orange-600" 
                    : "text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white"
                }`}>
                  {faq.q}
                </h3>
                
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${activeIdx === idx ? "bg-orange-600 rotate-180" : "bg-neutral-200 dark:bg-neutral-800 group-hover:bg-orange-600/20"}
                `}>
                  <ChevronDown
                    className={`w-5 h-5 transition-colors duration-300 ${
                      activeIdx === idx ? "text-white" : "text-neutral-500 group-hover:text-orange-600"
                    }`}
                  />
                </div>
              </div>

              {/* Answer Body */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeIdx === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-8">
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}