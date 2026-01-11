"use client";

import { useState } from "react";
import { WpPost } from "@/lib/wordpress";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

type BlogGridProps = {
  posts: WpPost[];
};

// Función para construir la URL del post con categoría
function getPostUrl(post: WpPost): string {
  if (post.categories && post.categories.length > 0) {
    return `/${post.categories[0]}/${post.slug}`;
  }
  return `/${post.slug}`;
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="py-20 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
      {/* Contador de artículos */}
      <div className="mb-12 text-center">
        <p className="text-sm font-bold text-neutral-500">
          {posts.length} {posts.length === 1 ? "artículo publicado" : "artículos publicados"}
        </p>
      </div>

      {/* Grid de Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {visiblePosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-600 dark:hover:border-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-600/10"
          >
            {/* Imagen Featured */}
            {post.featuredImage?.url ? (
              <Link href={getPostUrl(post)} className="relative w-full h-56 overflow-hidden">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </Link>
            ) : (
              <div className="w-full h-56 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Sin imagen</span>
              </div>
            )}

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-1">
              {/* Categorías */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 2).map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600/10 text-orange-700 dark:text-orange-400"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Título */}
              <Link href={getPostUrl(post)}>
                <h2 className="text-xl font-black text-neutral-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              {/* Excerpt */}
              {post.excerpt && (
                <div
                  className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.replace(/<[^>]*>/g, ""),
                  }}
                />
              )}

              {/* Footer: Fecha y Link */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {post.date && (
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}

                <Link
                  href={getPostUrl(post)}
                  className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:gap-2 transition-all"
                >
                  <span>Leer más</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Botón Cargar Más */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-lg hover:shadow-orange-600/20"
          >
            Cargar más artículos
          </button>
        </div>
      )}

      {/* Mensaje si no hay posts */}
      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-500 text-lg">
            No hay artículos publicados aún.
          </p>
        </div>
      )}
    </section>
  );
}
