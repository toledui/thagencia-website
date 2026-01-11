"use client";

import { useScrollReveal } from "@/hooks/useGSAPAnimations";
import type { WpPost } from "@/lib/wordpress";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogPosts({ posts }: { posts: WpPost[] }) {
  const sectionRef = useScrollReveal();

  if (!posts.length) return null;

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-32 px-6 md:px-20 bg-neutral-950"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 reveal-text">
          <div>
            <span className="text-orange-600 font-mono text-sm tracking-widest uppercase mb-3 block">
              // Blog
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              Insights & Casos
            </h2>
          </div>
          <Link
            href="#contacto"
            className="btn-secondary whitespace-nowrap"
          >
            Hablemos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-neutral-800 bg-neutral-900 p-6 flex flex-col gap-4 reveal-card"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-orange-600">
                {post.date ? new Date(post.date).toLocaleDateString() : ""}
              </div>
              <h3
                className="text-xl font-bold text-white"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              {post.excerpt && (
                <p
                  className="text-neutral-400 text-sm"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}
              <div className="mt-auto pt-2">
                <span className="inline-flex items-center gap-2 text-orange-500 text-sm font-semibold">
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
