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

export function Portfolio({ projects }: PortfolioProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Mapeo de datos (Wordpress o Estáticos)
  const items: PortfolioCardProps[] = (projects && projects.length
    ? projects.map((p, idx) => ({
        id: p.id ?? String(idx),
        title: p.title ?? "Proyecto",
        category: p.category ?? "Desarrollo Web",
        image: p.image ?? undefined,
        size: p.size ?? "small",
        year: "2024", // Puedes agregar este campo a tu CMS después
      }))
    : staticProjects.map((p) => ({
        id: p.id,
        title: p.client,
        category: p.category,
        image: p.image,
        size: p.size,
        year: "2024",
      })));

  // Animación de entrada del Grid
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header con estilo "Arquitecto" */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-neutral-200 dark:border-neutral-800 pb-10">
          <div>
            <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
              // Casos de Éxito
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
              TRABAJO<br />RECIENTE
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg text-right max-w-md leading-relaxed">
              Ingeniería digital aplicada. Resultados medibles para empresas que buscan escalar.
            </p>
            <a 
              href="/portafolio" 
              className="group flex items-center gap-3 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all duration-300"
            >
              <span>Ver Portafolio Completo</span>
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bento Grid Mejorado */}
        {/* auto-rows-max permite que el contenido respire, minmax ayuda a la altura mínima */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px] lg:auto-rows-[500px]">
          {items.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Tipos y Componente de Tarjeta ---------------- //

type PortfolioCardProps = {
  id: string;
  title: string;
  category?: string;
  image?: string;
  size?: "small" | "large" | "wide";
  year?: string;
};

function PortfolioCard({ project }: { project: PortfolioCardProps }) {
  // Lógica de clases para el Bento Grid
  const gridClasses = {
    small: "lg:col-span-1 lg:row-span-1",
    wide: "lg:col-span-2 lg:row-span-1",
    large: "lg:col-span-2 lg:row-span-2",
  };

  const sizeClass = gridClasses[project.size || "small"];

  return (
    <article
      className={`
        portfolio-card group relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 cursor-pointer
        ${sizeClass}
      `}
    >
      {/* 1. Imagen de Fondo con Efecto */}
      <div className="absolute inset-0 w-full h-full">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 
              grayscale-[0.3] group-hover:grayscale-0 
              scale-100 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.size === "large"}
          />
        ) : (
          // Fallback visual si no hay imagen (Patrón geométrico)
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        )}
        
        {/* 2. Overlay Gradiente (Siempre visible abajo para legibilidad) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
        
        {/* 3. Overlay Color en Hover (Efecto "Reveal") */}
        <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
      </div>

      {/* 4. Contenido (Texto) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        
        {/* Top: Categoría y Año */}
        <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-white/60 font-mono text-xs">{project.year}</span>
        </div>

        {/* Bottom: Título y Botón */}
        <div className="flex items-end justify-between gap-4">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-1">
              {project.title}
            </h3>
            <div className="h-1 w-0 bg-orange-600 group-hover:w-full transition-all duration-700 ease-in-out" />
          </div>

          {/* Botón Circular Icono */}
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-orange-600 hover:text-white">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </article>
  );
}