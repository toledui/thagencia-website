import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/BlogPostContent";
import { Calendar, ArrowLeft, User } from "lucide-react";
import {
  getPostBySlug,
  getAllPostSlugs,
  getSiteInfo,
  getPosts,
} from "@/lib/wordpress";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Convertir slug array a string con categoría
  const slugString = slug.join("/");
  const post = await getPostBySlug(slugString).catch(() => null);

  if (!post) {
    return {
      title: "Artículo no encontrado - THagencia",
    };
  }

  // Limpiar HTML del excerpt para meta descripción
  const cleanDescription = post.excerpt
    ? post.excerpt
        .replace(/<[^>]*>/g, "")
        .replace(/&[a-z]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
    : `Artículo: ${post.title}`;

  return {
    title: `${post.title} | Blog THagencia`,
    description: cleanDescription,
    alternates: {
      canonical: `https://thagencia.com/${slugString}`,
    },
    openGraph: {
      title: post.title,
      description: cleanDescription,
      url: `https://thagencia.com/${slugString}`,
      type: "article",
      images: post.featuredImage?.url ? [post.featuredImage.url] : [],
      publishedTime: post.date || undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  // Convertir slug array a string con categoría
  const slugString = slug.join("/");
  
  const [siteInfo, post, relatedPosts] = await Promise.all([
    getSiteInfo().catch(() => null),
    getPostBySlug(slugString).catch(() => null),
    getPosts(3).catch(() => []),
  ]);

  if (!post) {
    notFound();
  }

  // Convertir H1 a H2 para evitar doble H1
  const cleanContent = post.content
    ? post.content
        .replace(/<h1>/gi, "<h2>")
        .replace(/<\/h1>/gi, "</h2>")
    : "";

  // Helper para construir URLs de posts con categoría
  const getPostUrl = (p: any) => {
    if (p.categories && p.categories.length > 0) {
      const categorySlug = p.categories[0];
      return `/${categorySlug}/${p.slug}`;
    }
    return `/${p.slug}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <article className="pt-32 pb-20">
        {/* Navegación Superior */}
        <div className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto mb-8">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </a>
        </div>

        {/* Contenido Principal */}
        <div className="px-6 md:px-16 lg:px-20 max-w-5xl mx-auto">
          {/* Categorías */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600/10 text-orange-700 dark:text-orange-300 uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-neutral-900 dark:text-white mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-neutral-200 dark:border-neutral-800">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                )}
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  {post.author.name}
                </span>
              </div>
            )}

            {post.date && (
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>

          {/* Imagen Featured */}
          {post.featuredImage?.url && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl mb-12">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          )}

          {/* Contenido del Post */}
          {cleanContent && (
            <BlogPostContent content={cleanContent} />
          )}
        </div>

        {/* Posts Relacionados */}
        {relatedPosts.length > 0 && (
          <section className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto pt-20 mt-20 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">
              Más artículos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((p) => (
                  <a
                    key={p.id}
                    href={getPostUrl(p)}
                    className="group flex flex-col gap-4"
                  >
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      {p.featuredImage?.url ? (
                        <Image
                          src={p.featuredImage.url}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">
                          Sin imagen
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      {p.date && (
                        <p className="text-sm text-neutral-500 mt-2">
                          {new Date(p.date).toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
