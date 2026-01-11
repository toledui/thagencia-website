"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { WpProject } from "@/lib/wordpress";

interface ProjectsGalleryProps {
  projects: WpProject[];
  categories: string[];
}

export function ProjectsGallery({ projects, categories }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => (p.category || "").toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, projects]);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-10">
      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
            activeCategory === "all"
              ? "bg-orange-600 text-white border-orange-600 shadow"
              : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-orange-600 hover:text-orange-600"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-orange-600 text-white border-orange-600 shadow"
                : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-orange-600 hover:text-orange-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project) => (
          <a
            key={project.id}
            href={project.slug ? `/portafolio/${project.slug}` : "#"}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow transition-all duration-300 hover:-translate-y-1 block"
          >
            <div className="relative w-full h-56">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600/10 text-orange-700 dark:text-orange-300">
                  {project.category || "Proyecto"}
                </span>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-orange-600 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight line-clamp-2">
                {project.title}
              </h3>
            </div>
          </a>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-500 dark:text-neutral-400 py-10 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
            No hay proyectos en esta categoría.
          </div>
        )}
      </div>

      {visible.length < filtered.length && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 transition-colors shadow"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}
