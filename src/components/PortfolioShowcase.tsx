"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { portfolioProjects as staticProjects } from "@/lib/content";
import type { WpProject } from "@/lib/wordpress";
import { ArrowUpRight, MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PortfolioProps = {
  projects?: WpProject[];
};

export function PortfolioShowcase({ projects }: PortfolioProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Mapeo de datos (Limitado a 4 para grid 2x2)
  const items: PortfolioCardProps[] = (projects && projects.length > 0
    ? projects.slice(0, 4).map((p, idx) => ({
        id: p.id ?? String(idx),
        slug: p.slug,
        title: p.title ?? "Proyecto",
        category: p.category ?? "Desarrollo Web",
        image: p.image ?? undefined,
        size: "small", // Forzamos 'small' para el grid uniforme
        year: "2024",
      }))
    : staticProjects.slice(0, 4).map((p) => ({
        id: p.id,
        title: p.client,
        category: p.category,
        image: p.image,
        size: "small",
        year: "2024",
      })));

  // Animación de entrada
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="proyectos"
      className="py-32 px-6 md:px-20 bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER (El que ya te gusta) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-neutral-200 dark:border-neutral-800 pb-10">
          <div>
            <h3 className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              // Portafolio de Desarrollo Web
            </h3>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
              CASOS DE<br />{' '}ÉXITO
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg text-right max-w-md leading-relaxed">
              Resultados medibles, no promesas. Transformamos negocios locales en referentes digitales mediante arquitectura de software escalable y estrategias de posicionamiento que dominan el mercado.
            </p>
            <a 
              href="/proyectos" 
              className="group flex items-center gap-3 text-neutral-900 dark:text-white font-bold border-b-2 border-transparent hover:border-orange-600 transition-all duration-300 pb-1"
            >
              <span>Explorar todos los proyectos</span>
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-600" />
            </a>
          </div>
        </div>

        {/* GRID 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[450px]">
          {items.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- TARJETA CON FONDO EN TÍTULO ---------------- //

type PortfolioCardProps = {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  image?: string;
  size?: "small" | "large" | "wide";
  year?: string;
};

function PortfolioCard({ project }: { project: PortfolioCardProps }) {
  // Configuración de Grid (Aunque en 2x2 casi todos son iguales, lo dejamos preparado)
  const gridClasses = {
    small: "md:col-span-1",
    wide: "md:col-span-2",
    large: "md:col-span-2 md:row-span-2",
  };

  const sizeClass = gridClasses[project.size || "small"];

  return (
    <a
      href={project.slug ? `/portafolio/${project.slug}` : "/proyectos"}
      className={`
        portfolio-card group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 dark:from-neutral-900 dark:to-neutral-950 cursor-pointer border border-neutral-800 dark:border-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300 block
        ${sizeClass}
      `}
    >
      {/* IMAGEN CON OVERLAY */}
      <div className="absolute inset-0 w-full h-full">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 
              grayscale-[0.3] group-hover:grayscale-0 
              scale-100 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        )}
        
        {/* OVERLAY DARK MEJORADO */}
        <div 
          className="
            absolute inset-0 
            bg-gradient-to-t 
            from-black/70 via-black/30 to-transparent 
            group-hover:from-black/60 group-hover:via-black/20
            transition-all duration-500
          " 
        />
      </div>

      {/* CONTENIDO - POSICIÓN BAJA */}
      <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end z-10">
        
        {/* Categoría + Año (Pequeño, arriba en hover) */}
        <div className="mb-4 flex items-center justify-between text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-2.5 py-1 bg-orange-600 text-white font-bold uppercase tracking-wider rounded-full">
            {project.category}
          </span>
          <span className="text-neutral-400">{project.year}</span>
        </div>

        {/* TÍTULO + BOTÓN */}
        <div className="flex items-end justify-between gap-3 md:gap-4">
          
          {/* Título limpio */}
          <div className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-black/5 group-hover:bg-black/15 transition-colors duration-300">
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
              {project.title}
            </h3>
            {/* Línea naranja animada bajo título */}
            <div className="h-0.5 w-0 bg-orange-600 group-hover:w-full transition-all duration-700 ease-in-out mt-2" />
          </div>

          {/* Botón Circular - Siempre visible en móvil, animado en desktop */}
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-600/30">
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </a>
  );
}