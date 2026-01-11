"use client";

import { useRef, useLayoutEffect } from "react";
import { services } from "@/lib/content";
import { CheckCircle, ArrowRight, Code2, Layers, LineChart } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "01": Code2,
  "02": Layers,
  "03": LineChart,
};

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de contadores numéricos
      const counters = sectionRef.current?.querySelectorAll<HTMLElement>(
        ".services-counter"
      );

      counters?.forEach((counter) => {
        const target = counter.dataset.target || "0";
        const isPercent = target.includes("%");
        const isPlus = target.includes("+");
        const numericValue = parseInt(target.replace(/\D/g, "")) || 0;

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            },
            onUpdate: function () {
              const current = Math.ceil(Number(counter.textContent || 0));
              if (isPercent) {
                counter.textContent = `${current}%`;
              } else if (isPlus) {
                counter.textContent = `+${current}`;
              } else {
                counter.textContent = `${current}`;
              }
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Soluciones integrales diseñadas para cada etapa de tu transformación digital
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = iconMap[service.id as keyof typeof iconMap];
          
          return (
            <article
              key={service.id}
              className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 hover:border-orange-600 dark:hover:border-orange-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-600/10"
            >
              {/* Número de Servicio */}
              <div className="absolute top-8 right-8 text-6xl font-black text-neutral-100 dark:text-neutral-800 group-hover:text-orange-600/20 transition-colors">
                {service.id}
              </div>

              {/* Icono */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-orange-600/10 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-all">
                <Icon className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>

              {/* Título y Subtítulo */}
              <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm font-bold text-orange-600 mb-4">
                {service.subtitle}
              </p>

              {/* Descripción */}
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
                {service.tags.length > 3 && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    +{service.tags.length - 3} más
                  </span>
                )}
              </div>

              {/* CTA */}
              <Link
                href={service.link}
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:gap-3 transition-all group/link"
              >
                <span>Ver Detalles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          );
        })}
      </div>

      {/* Sección de Beneficios */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div 
            className="text-4xl font-black text-orange-600 mb-2 services-counter" 
            data-target="+100"
          >
            0
          </div>
          <div className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
            Proyectos Entregados
          </div>
        </div>
        <div className="text-center p-6">
          <div 
            className="text-4xl font-black text-orange-600 mb-2 services-counter" 
            data-target="+8"
          >
            0
          </div>
          <div className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
            Años de Experiencia
          </div>
        </div>
        <div className="text-center p-6">
          <div 
            className="text-4xl font-black text-orange-600 mb-2 services-counter" 
            data-target="100%"
          >
            0
          </div>
          <div className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
            Clientes Satisfechos
          </div>
        </div>
      </div>
    </section>
  );
}
