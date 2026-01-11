"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SEOBlock() {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".seo-text-anim", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2, // Efecto cascada entre título y párrafos
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 80%", // Se activa un poco antes para mejor UX
        },
      });
    }, blockRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={blockRef}
      className="py-24 md:py-32 px-6 md:px-20 bg-white dark:bg-neutral-900 relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      {/* 1. Fondo Decorativo (Sutil en ambos modos) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent dark:from-orange-600/10 pointer-events-none" />
      
      {/* 2. Grid Pattern muy suave para textura técnica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">
          
          {/* H2: Keyword Principal + Propuesta de Valor */}
          <h2 className="seo-text-anim text-3xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
            Más que una Agencia,{' '}<br />
            somos tu <span className="text-orange-600">Partner de Desarrollo Web en Querétaro</span>.
          </h2>

          <div className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed space-y-6 max-w-3xl mx-auto">
            
            {/* Párrafo 1: Autoridad y Enfoque Local */}
            <p className="seo-text-anim">
              En <strong className="text-neutral-900 dark:text-white font-bold">THagencia</strong>, entendemos que tu sitio web no es un adorno, es el motor de tu estrategia comercial. Como líderes en <strong className="text-neutral-900 dark:text-white font-bold">Desarrollo Web en el Bajío</strong>, nos especializamos en construir infraestructura digital robusta, segura y diseñada para escalar junto con tu empresa.
            </p>

            {/* Párrafo 2: Servicios Técnicos y ROI (Keywords secundarias) */}
            <p className="seo-text-anim">
              Desde startups tecnológicas hasta industrias consolidadas en los parques industriales de Querétaro, desarrollamos <strong className="text-neutral-900 dark:text-white font-bold">Sistemas a la Medida (ERP/CRM)</strong> y plataformas de comercio electrónico optimizadas para la conversión. Nuestro enfoque en <strong className="text-neutral-900 dark:text-white font-bold">Posicionamiento SEO Técnico</strong> garantiza que tu inversión genere un retorno visible (ROI), colocando a tu negocio frente a los clientes que realmente buscan tus soluciones en Google.
            </p>

            {/* Párrafo 3: Cierre de Confianza (Humanización) */}
            <p className="seo-text-anim italic font-medium text-neutral-800 dark:text-neutral-300 border-l-4 border-orange-600 pl-4 py-1 bg-orange-50 dark:bg-white/5 rounded-r-lg">
              "No dejes tu activo digital más importante en manos de aficionados; confía en expertos en ingeniería de software y estrategia de mercado."
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}