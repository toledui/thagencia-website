"use client"; // <--- ESTO ES CRUCIAL AQUÍ

import { useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Code2, LineChart } from "lucide-react";
import gsap from "gsap";

export function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.to(".hero-blob", {
        y: "20px",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 px-6 md:px-16 lg:px-20 overflow-hidden">
        {/* Mesh Background */}
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="hero-blob absolute top-0 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"></div>
          <div className="hero-blob absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" style={{ animationDelay: "-2s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/10 border border-orange-600/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                Ingeniería de Software & Marketing
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="hero-anim text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8 text-neutral-900 dark:text-white">
              Servicios que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                transforman
              </span>{" "}
              tu negocio
            </h1>

            {/* Descripción */}
            <p className="hero-anim text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl">
              Dejamos atrás las "webs informativas". Creamos ecosistemas digitales diseñados para automatizar procesos, captar leads calificados y aumentar tu facturación.
            </p>

            {/* Features Mini-Grid */}
            <div className="hero-anim grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-sm font-bold text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-orange-600" />
                    <span>Clean Code</span>
                </div>
                <div className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-orange-600" />
                    <span>ROI Focus</span>
                </div>
            </div>

            {/* CTAs */}
            <div className="hero-anim flex flex-wrap gap-4">
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-lg hover:shadow-orange-600/20 group"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/proyectos"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold rounded-xl hover:border-orange-600 hover:text-orange-600 dark:hover:border-orange-600 dark:hover:text-orange-600 transition-all"
              >
                Ver Portafolio
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}