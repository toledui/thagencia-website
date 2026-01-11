import { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllProjectSlugs } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thagencia.com';

  // 1. Páginas estáticas principales
  const routes = [
    '',
    '/agencia',
    '/portafolio',
    '/proyectos',
    '/blog',
    '/contacto',
    '/servicios',
    '/servicios/desarrollo-web',
    '/servicios/diseno-web',
    '/servicios/posicionamiento-seo',
    '/aviso-de-privacidad',
    '/aviso-de-cookies',
    '/terminos-y-condiciones',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route.startsWith('/servicios') ? 0.9 : 0.8,
  }));

  // 2. Blog posts dinámicos desde WordPress
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const postSlugs = await getAllPostSlugs();
    blogRoutes = postSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
    console.log(`✓ Sitemap: ${blogRoutes.length} blog posts incluidos`);
  } catch (error) {
    console.error('Error al generar rutas de blog en sitemap:', error);
  }

  // 3. Proyectos dinámicos desde WordPress
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projectSlugs = await getAllProjectSlugs();
    projectRoutes = projectSlugs.map((slug) => ({
      url: `${baseUrl}/portafolio/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
    console.log(`✓ Sitemap: ${projectRoutes.length} proyectos incluidos`);
  } catch (error) {
    console.error('Error al generar rutas de proyectos en sitemap:', error);
  }

  return [...routes, ...blogRoutes, ...projectRoutes];
}
