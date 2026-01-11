import { fetchGraphQL } from "./client";
import type { SiteInfo, WpImage, WpPost, WpProject } from "./types";

function mapImage(node: any | null | undefined): WpImage | null {
  if (!node) return null;
  return {
    url: node.sourceUrl ?? null,
    alt: node.altText ?? null,
    width: node.mediaDetails?.width ?? null,
    height: node.mediaDetails?.height ?? null,
  };
}

export async function getSiteInfo(): Promise<SiteInfo | null> {
  const logoIdRaw = process.env.WORDPRESS_SITE_LOGO_ID;
  const logoId = logoIdRaw ? Number(logoIdRaw) : null;

  const query = `
    query SiteInfo($withLogo: Boolean!, $logoId: ID) {
      generalSettings {
        title
        description
      }
      logo: mediaItem(id: $logoId, idType: DATABASE_ID) @include(if: $withLogo) {
        sourceUrl
        altText
        mediaDetails { width height }
      }
    }
  `;

  const data = await fetchGraphQL<{
    generalSettings?: { title?: string; description?: string } | null;
    logo?: any | null;
  }>(query, {
    withLogo: Boolean(logoId),
    logoId,
  });

  if (!data.generalSettings?.title) return null;

  return {
    title: data.generalSettings.title,
    description: data.generalSettings.description ?? null,
    logo: mapImage(data.logo),
  };
}

export async function getPosts(limit = 6): Promise<WpPost[]> {
  const query = `
    query Posts($first: Int!) {
      posts(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    posts?: { nodes?: any[] } | null;
  }>(query, { first: limit });

  return (
    data.posts?.nodes ?? []
  ).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title ?? "Sin título",
    excerpt: p.excerpt ?? null,
    date: p.date ?? null,
    featuredImage: mapImage(p.featuredImage?.node),
  }));
}

export async function getProjects(limit = 6): Promise<WpProject[]> {
  const query = `
    query Projects($first: Int!) {
      projects(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          excerpt
          date
          projectCategories {
            nodes { name }
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{
      projects?: { nodes?: any[] } | null;
    }>(query, { first: limit });

    return (
      data.projects?.nodes ?? []
    ).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title ?? "Proyecto",
      excerpt: p.excerpt ?? null,
      category: p.projectCategories?.nodes?.[0]?.name ?? null,
      featuredImage: mapImage(p.featuredImage?.node),
    }));
  } catch (err) {
    // Si el CPT `projects` no existe, devolvemos vacío sin romper la página.
    console.warn("WPGraphQL projects no disponible:", err instanceof Error ? err.message : err);
    return [];
  }
}
