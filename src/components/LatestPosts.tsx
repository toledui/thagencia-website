"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { WpPost } from "@/lib/wordpress";
import { Calendar, ArrowRight } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

export function LatestPosts({ posts }: { posts: WpPost[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !posts.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  if (!posts.length) return null;

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-32 px-6 md:px-20 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-orange-600 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            // Recursos para Empresas
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 transition-colors duration-300">
            GUÍAS DE MARKETING<br />{' '}Y WEB
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl transition-colors duration-300">
            Estrategias de <strong>Desarrollo Web</strong> y <strong>Posicionamiento SEO</strong> diseñadas para vender. Convertimos nuestra experiencia técnica en tu ventaja competitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className="blog-card group relative bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-orange-600/50 transition-all duration-300 overflow-hidden"
            >
              {/* Featured Image */}
              {post.featuredImage?.url && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt ?? post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent opacity-60" />
                </div>
              )}

              <div className="p-6">
                {post.date && (
                  <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-500 uppercase tracking-wider mb-3 transition-colors duration-300">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}

                <h3
                  className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />

                {post.excerpt && (
                  <div
                    className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}

                <Link
                  href={post.categories && post.categories.length > 0 ? `/${post.categories[0]}/${post.slug}` : `/${post.slug}`}
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold hover:border-orange-600 hover:text-orange-600 dark:hover:border-orange-600 dark:hover:text-orange-600 transition-all duration-300"
          >
            VER TODOS LOS ARTÍCULOS
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
