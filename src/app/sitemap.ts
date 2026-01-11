import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thagencia.com';

  // 1. Páginas estáticas
  const routes = [
    '',
    '/portafolio',
    '/blog',
    '/contacto',
    '/aviso-de-privacidad',
    '/terminos-y-condiciones',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Páginas dinámicas (Blog Posts)
  // Descomenta esto cuando conectes tus posts reales desde WordPress
  /*
  const posts = await getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  */

  return [...routes]; // return [...routes, ...blogRoutes];
}
