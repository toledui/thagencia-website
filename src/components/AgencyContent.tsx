"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Terminal, LineChart, Award, ArrowRight, PiggyBank, ShieldCheck, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AgencyContent() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".agency-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".bento-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-600/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute -left-24 top-10 w-72 h-72 bg-orange-600/10 blur-3xl rounded-full" />
      <div className="absolute -right-32 -top-10 w-80 h-80 bg-blue-700/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO SECTION: La Promesa */}
        <div className="mb-20 max-w-4xl">
          <span className="agency-reveal text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            // Sobre THagencia
          </span>
          <h1 className="agency-reveal text-5xl md:text-7xl font-black text-neutral-900 dark:text-white leading-[0.9] mb-8">
            INGENIERÍA DIGITAL<br />
            <span className="text-neutral-400">CON VISIÓN DE NEGOCIO.</span>
          </h1>
          <div className="agency-reveal text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl border-l-4 border-orange-600 pl-6">
            <p>
              No somos una fábrica de plantillas. Somos un equipo de ingeniería liderado por desarrolladores, obsesionados con el rendimiento, la escalabilidad y el retorno de inversión real.
            </p>
          </div>
        </div>

        {/* BENTO GRID: El Core de E-E-A-T */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          {/* CARD 1: EL FUNDADOR (Grande) */}
          <div className="bento-card group relative col-span-1 md:col-span-2 lg:col-span-2 row-span-2 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
            <div className="absolute inset-0 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700">
              <Image
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop"
                alt="Luis Toledo - Fundador THagencia"
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  Founder & Lead Dev
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Luis Toledo</h2>
                <p className="text-neutral-300 leading-relaxed text-sm md:text-base max-w-md">
                  "Llevo más de 8 años escribiendo código, pero mi verdadero trabajo es resolver problemas de negocio. Como emprendedor y Full Stack Developer, entiendo que un sistema no sirve si no genera rentabilidad."
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: EXPERIENCIA (Dato Duro) */}
          <div className="bento-card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-600/50 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-5xl font-black text-neutral-900 dark:text-white mb-1">+8</span>
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Años de Experiencia</span>
              <p className="text-xs text-neutral-400 mt-2">Desde startups locales hasta sistemas industriales complejos.</p>
            </div>
          </div>

          {/* CARD 3: ENFOQUE TÉCNICO */}
          <div className="bento-card bg-neutral-100 dark:bg-neutral-800 p-8 rounded-3xl flex flex-col justify-center gap-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Stack Tecnológico</h3>
            <div className="flex flex-wrap gap-2">
              {["Laravel", "Next.js", "React", "Node.js", "SQL", "AWS"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded text-xs font-mono text-neutral-600 dark:text-neutral-400"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-neutral-500 mt-2">Seleccionamos la herramienta correcta para cada problema, no al revés.</p>
          </div>

          {/* CARD 4: MANIFIESTO (Texto) */}
          <div className="bento-card md:col-span-2 bg-orange-600 p-8 md:p-10 rounded-3xl flex flex-col justify-center text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
              <Terminal size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Nuestra Filosofía: Sin Atajos</h3>
            <p className="text-white/90 leading-relaxed relative z-10 max-w-lg">
              En un mercado saturado de soluciones rápidas y mal hechas, nosotros apostamos por la <strong>calidad artesanal del código</strong>. Creemos que un sitio web o un sistema debe ser un activo que se revaloriza con el tiempo, no un gasto que hay que rehacer cada año.
            </p>
          </div>

        </div>

        {/* FILA DE 4 CARDS DESTACADAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Resultados */}
          <div className="bento-card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Resultados</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                No entregamos código, entregamos soluciones que facturan, optimizan y escalan.
              </p>
            </div>
          </div>

          {/* Rentabilidad (ROI) */}
          <div className="bento-card bg-neutral-100 dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/10 text-orange-700 dark:text-orange-300 flex items-center justify-center">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Rentabilidad</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Transformamos la tecnología en utilidad neta. Tu plataforma deja de ser un gasto operativo para convertirse en tu activo comercial más potente.
              </p>
            </div>
          </div>

          {/* Certeza (Infraestructura) */}
          <div className="bento-card bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-800 dark:text-blue-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Certeza</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Eliminamos la incertidumbre técnica. Infraestructura robusta para soportar crecimiento agresivo sin fallos.
              </p>
            </div>
          </div>

          {/* Estrategia (Competencia) */}
          <div className="bento-card bg-neutral-100 dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Estrategia</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                El código es el vehículo. Programamos ventajas competitivas para que lideres tu sector.
              </p>
            </div>
          </div>
        </div>

        {/* CTA FINAL DE SECCIÓN */}
        <div className="mt-20 flex justify-center">
          <a
            href="/contacto"
            className="group flex items-center gap-4 text-xl font-bold text-neutral-900 dark:text-white hover:text-orange-600 transition-colors"
          >
            <span>¿Tienes un proyecto en mente?</span>
            <div className="w-12 h-12 rounded-full border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
