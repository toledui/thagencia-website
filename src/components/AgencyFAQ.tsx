"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

// Datos de preguntas
const faqs = [
  {
    q: "¿Por qué elegir desarrollo a la medida en lugar de una plantilla?",
    a: "Las plantillas son soluciones genéricas para problemas genéricos. El desarrollo a la medida es ingeniería aplicada a tu modelo de negocio específico. Garantiza velocidad extrema, seguridad blindada y, lo más importante, la capacidad de escalar sin tener que reconstruir todo en 6 meses."
  },
  {
    q: "¿Cómo garantizan que el proyecto se entregue a tiempo?",
    a: "No improvisamos. Utilizamos metodologías ágiles (Scrum) con 'Sprints' quincenales. Tendrás acceso a un entorno de pruebas (Staging) para ver avances reales cada dos semanas, eliminando las sorpresas de último minuto y asegurando transparencia total."
  },
  {
    q: "¿Soy dueño del código fuente al terminar el proyecto?",
    a: "Absolutamente. A diferencia de las agencias que 'secuestran' tu sitio, en THagencia firmamos un contrato donde se estipula que la propiedad intelectual y el código fuente te pertenecen al 100% una vez liquidado el proyecto."
  },
  {
    q: "¿Qué sucede si mi empresa crece y necesito nuevas funciones?",
    a: "Esa es la ventaja de nuestra arquitectura de software. Al usar tecnologías modernas (Next.js, Laravel, React), construimos sistemas modulares. Agregar una nueva funcionalidad es como añadir una pieza de Lego; no afecta a la estructura base ni requiere tirar todo a la basura."
  },
  {
    q: "¿Trabajan con empresas fuera de Querétaro?",
    a: "Sí. Aunque nuestra base operativa e ingeniería está en El Marqués, Querétaro, trabajamos con clientes en todo México y el extranjero. Nuestras herramientas de gestión de proyectos y comunicación nos permiten operar como tu brazo tecnológico remoto sin fricción."
  }
];

export function AgencyFAQ() {
  // Estado para abrir/cerrar (El primero abierto por defecto para que se vea contenido)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Schema SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-12 text-center">
          METODOLOGÍA Y <span className="text-orange-600">GARANTÍAS</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div 
              key={idx} 
              // Eliminé la clase 'agency-faq-item' para quitar conflictos con GSAP previos
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-300 hover:border-orange-600/30 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === idx ? "text-orange-600" : "text-neutral-900 dark:text-white group-hover:text-orange-600"}`}>
                  {item.q}
                </span>
                <span className={`p-2 rounded-full transition-all duration-300 ${openIndex === idx ? "bg-orange-600 text-white rotate-180" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:text-orange-600"}`}>
                  {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              {/* Acordeón con CSS puro (más fiable) */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-6 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-dashed border-neutral-200 dark:border-neutral-800 mt-2">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}