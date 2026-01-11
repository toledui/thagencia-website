import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowLeft, ExternalLink, Globe } from "lucide-react";
import { 
  getProjectBySlug, 
  getAllProjectSlugs, 
  getSiteInfo,
  getPortfolioProjects 
} from "@/lib/wordpress";

const siteUrl = "https://thagencia.com";
const logoPath = "/uploads/images/thagencia-logo.jpg";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    return {
      title: "Proyecto no encontrado - THagencia",
    };
  }

  // Limpiar HTML y entidades del excerpt para meta descripción
  const cleanDescription = project.excerpt 
    ? project.excerpt
        .replace(/<[^>]*>/g, "") // Eliminar etiquetas HTML
        .replace(/&[a-z]+;/gi, " ") // Eliminar entidades HTML como &#8211;
        .replace(/\s+/g, " ") // Normalizar espacios
        .trim()
    : `Proyecto de desarrollo web: ${project.title}`;

  return {
    title: project.seo?.title || `${project.title} | THagencia`,
    description: project.seo?.description || cleanDescription,
    alternates: {
      canonical: `https://thagencia.com/portafolio/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: cleanDescription,
      url: `https://thagencia.com/portafolio/${slug}`,
      images: project.featuredImage?.url
        ? [project.featuredImage.url]
        : [`${siteUrl}${logoPath}`],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [siteInfo, project, relatedProjects] = await Promise.all([
    getSiteInfo().catch(() => null),
    getProjectBySlug(slug).catch(() => null),
    getPortfolioProjects(3).catch(() => []),
  ]);

  if (!project) {
    notFound();
  }

  // Limpiamos el shortcode [portfolio_info] y convertimos H1 a H2 para evitar doble H1
  const cleanContent = project.content 
    ? project.content
        .replace(/\[portfolio_info\]/g, "") // Eliminar shortcode
        .replace(/<h1>/gi, "<h2>") // Convertir H1 a H2
        .replace(/<\/h1>/gi, "</h2>") // Convertir cierre H1 a H2
    : "";

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      <Header siteTitle={siteInfo?.title} logoUrl={siteInfo?.logo?.url} />

      <article className="pt-32 pb-20">
        {/* Navegación Superior */}
        <div className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto mb-8">
          <a
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a proyectos
          </a>
        </div>

        {/* HERO SECTION: Título + Info + Imagen Destacada */}
        <section className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto mb-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMNA IZQUIERDA (Info) - Span 5 */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              
              {/* Categorías */}
              <div className="flex flex-wrap gap-2">
                {project.categories?.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600/10 text-orange-700 dark:text-orange-300 uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl font-black leading-[1.1] text-neutral-900 dark:text-white">
                {project.title}
              </h1>

              {/* Excerpt */}
              {project.excerpt && (
                <div 
                  className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.excerpt }}
                />
              )}

              {/* Metadatos (Fecha) */}
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {project.date && (
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.date).toLocaleDateString("es-MX", { year: "numeric", month: "long" })}
                  </div>
                )}
              </div>

              {/* BOTÓN: VISITAR SITIO WEB (NUEVO) */}
              {project.clientUrl && (
                <div className="pt-2">
                  <a 
                    href={project.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-lg hover:shadow-orange-600/20 group"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Visitar Sitio Web</span>
                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA (Visuales) - Span 7 */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* 1. IMAGEN DESTACADA (Portada) */}
              {project.featuredImage?.url && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt || project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              )}

              {/* 2. CONTENIDO (Descripción larga) */}
              {cleanContent && (
                <div
                  className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                    prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:font-black prose-h1:mb-6 prose-h1:!text-neutral-900 dark:prose-h1:!text-white
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:!text-neutral-900 dark:prose-h2:!text-white
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-h3:!text-neutral-900 dark:prose-h3:!text-white
                    prose-p:!text-neutral-700 dark:prose-p:!text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-4 prose-ul:space-y-2
                    prose-li:!text-neutral-700 dark:prose-li:!text-neutral-300 prose-li:leading-relaxed
                    prose-strong:!text-neutral-900 dark:prose-strong:!text-white prose-strong:font-bold
                    prose-a:!text-orange-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:my-6
                    [&_strong]:!text-neutral-900 dark:[&_strong]:!text-white"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              )}

              {/* 3. SCREENSHOT COMPLETO (NUEVO - Estilo Marco de Navegador) */}
              {project.screenshotUrl && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-1 bg-orange-600 rounded-full"></span>
                    Vista Previa del Proyecto
                  </h3>
                  
                  {/* Marco de Navegador */}
                  <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-2xl bg-neutral-100 dark:bg-neutral-800">
                    {/* Barra de título del navegador */}
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      {/* URL simulada */}
                      <div className="ml-4 flex-1 h-5 bg-white dark:bg-neutral-900 rounded text-[10px] flex items-center px-3 text-neutral-400 font-mono truncate opacity-50">
                        {project.clientUrl || "https://..."}
                      </div>
                    </div>
                    
                    {/* Imagen del Screenshot */}
                    <div className="relative w-full">
                      <Image
                        src={project.screenshotUrl}
                        alt={`Captura de pantalla de ${project.title}`}
                        width={1200}
                        height={1600}
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* PROYECTOS RELACIONADOS */}
        {relatedProjects.length > 0 && (
          <section className="px-6 md:px-16 lg:px-20 max-w-7xl mx-auto pt-20 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-10">
              Sigue explorando
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p) => (
                  <a
                    key={p.id}
                    href={`/portafolio/${p.slug}`}
                    className="group flex flex-col gap-4"
                  >
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">Sin imagen</div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-600 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">{p.category}</p>
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
