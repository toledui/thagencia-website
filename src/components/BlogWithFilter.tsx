"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { WpPost } from "@/lib/wordpress";
import { BlogGrid } from "@/components/BlogGrid";
import { X, ChevronDown } from "lucide-react";

type BlogWithFilterProps = {
  posts: WpPost[];
};

export function BlogWithFilter({ posts }: BlogWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    posts.forEach((post) => {
      post.categories?.forEach((cat) => allCategories.add(cat));
    });
    return Array.from(allCategories).sort();
  }, [posts]);

  // Filtrar posts por categoría
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) =>
      post.categories?.includes(selectedCategory)
    );
  }, [posts, selectedCategory]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Filter Section */}
      <section className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto py-12">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {selectedCategory 
                ? `Mostrando ${filteredPosts.length} artículo${filteredPosts.length !== 1 ? "s" : ""} de ${categories.find(c => c === selectedCategory)}`
                : `${posts.length} artículos disponibles`
              }
            </p>
          </div>

          {/* Dropdown Filter */}
          <div ref={dropdownRef} className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 hover:border-orange-600/30 dark:hover:border-orange-600/30 transition-all font-semibold text-sm"
            >
              <span className="truncate">
                {selectedCategory ? selectedCategory : "Explorar por tema"}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-full sm:w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl z-50">
                {/* Header */}
                <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    Categorías
                  </h3>
                </div>

                {/* Options */}
                <div className="max-h-80 overflow-y-auto">
                  {/* Todos */}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors border-b border-neutral-100 dark:border-neutral-800 ${
                      selectedCategory === null
                        ? "bg-orange-600/10 text-orange-600 dark:text-orange-400"
                        : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Todos</span>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800">
                        {posts.length}
                      </span>
                    </div>
                  </button>

                  {/* Categories */}
                  {categories.map((category) => {
                    const count = posts.filter((p) =>
                      p.categories?.includes(category)
                    ).length;
                    const isSelected = selectedCategory === category;

                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 ${
                          isSelected
                            ? "bg-orange-600/10 text-orange-600 dark:text-orange-400"
                            : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category}</span>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800">
                            {count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clear filter button */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600/10 text-orange-600 dark:text-orange-400 hover:bg-orange-600/20 transition-colors text-sm font-semibold"
          >
            <X className="w-4 h-4" />
            Limpiar filtro
          </button>
        )}
      </section>

      {/* Results */}
      {filteredPosts.length > 0 ? (
        <BlogGrid posts={filteredPosts} />
      ) : (
        <div className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto py-32 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 mb-6">
            <X className="w-8 h-8 text-neutral-400" />
          </div>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            No hay artículos
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            No encontramos artículos en la categoría "{selectedCategory}"
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-6 px-6 py-2.5 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
          >
            Ver todos los artículos
          </button>
        </div>
      )}
    </div>
  );
}
