const API_URL = process.env.WORDPRESS_API_URL;

export type WpImage = {
  url: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type SiteInfo = {
  title: string;
  description?: string | null;
  logo?: WpImage | null;
};

export type WpPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: WpImage | null;
  content?: string | null;
  categories?: string[];
  author?: {
    name: string;
    avatar?: string | null;
  } | null;
};

export type WpProject = {
  id: string;
  slug?: string;
  title: string;
  category?: string | null;
  image?: string | null;
  size?: "small" | "large" | "wide";
};

export type WpProjectDetail = {
  id: string;
  slug: string;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  date?: string | null;
  categories: string[];
  featuredImage?: WpImage | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  };
  clientUrl?: string | null;
  screenshotUrl?: string | null;
};

interface FetchAPIOptions {
  variables?: Record<string, unknown>;
}

// Fetch helper con ISR y manejo de errores
export async function fetchAPI<T = any>(
  query: string,
  { variables }: FetchAPIOptions = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL no está definido en .env.local");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = process.env.WORDPRESS_AUTH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GraphQL HTTP ${res.status}: ${text}`);
    }

    const json = await res.json();

    if (json.errors) {
      const errorMessages = json.errors.map((e: any) => e.message).join(" | ");
      console.error("❌ GraphQL Errors:", json.errors);
      throw new Error(`WPGraphQL: ${errorMessages}`);
    }

    return json.data as T;
  } catch (error) {
    console.error("❌ Error fatal haciendo fetch a WordPress:", error);
    throw error;
  }
}

function mapImage(node: any | null | undefined): WpImage | null {
  if (!node) return null;
  return {
    url: node.sourceUrl ?? null,
    alt: node.altText ?? null,
    width: node.mediaDetails?.width ?? null,
    height: node.mediaDetails?.height ?? null,
  };
}

// Site info (título/desc + logo opcional por ID)
export async function getSiteInfo(): Promise<SiteInfo | null> {
  const logoIdRaw = process.env.WORDPRESS_SITE_LOGO_ID;
  const logoId = logoIdRaw ? Number(logoIdRaw) : null;

  const query = `
    query SiteInfo($withLogo: Boolean!, $logoId: ID!) {
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

  const data = await fetchAPI<{
    generalSettings?: { title?: string; description?: string } | null;
    logo?: any | null;
  }>(query, { variables: { withLogo: Boolean(logoId), logoId } });

  if (!data.generalSettings?.title) return null;

  return {
    title: data.generalSettings.title,
    description: data.generalSettings.description ?? null,
    logo: mapImage(data.logo),
  };
}

// Posts estándar
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
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
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

  const data = await fetchAPI<{
    posts?: { nodes?: any[] } | null;
  }>(query, { variables: { first: limit } });

  return (data.posts?.nodes ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title ?? "Sin título",
    excerpt: p.excerpt ?? null,
    date: p.date ?? null,
    categories: p.categories?.nodes?.map((n: any) => n.slug) ?? [],
    author: p.author?.node ? {
      name: p.author.node.name ?? "Autor",
      avatar: p.author.node.avatar?.url ?? null,
    } : null,
    featuredImage: mapImage(p.featuredImage?.node),
  }));
}

// Proyectos (CPT portafolio con graphql_plural_name = "proyectos")
export async function getPortfolioProjects(limit = 6): Promise<WpProject[]> {
  const query = `
    query Portfolio($first: Int!) {
      proyectos(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          slug
          title
          projectCategories: tiposProyecto {
            nodes { name }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI<{
    proyectos?: { nodes?: any[] } | null;
  }>(query, { variables: { first: limit } });

  return (data.proyectos?.nodes ?? []).map((p, idx) => ({
    id: p.id ?? p.slug ?? String(idx),
    slug: p.slug ?? undefined,
    title: p.title ?? "Proyecto",
    category: p.projectCategories?.nodes?.[0]?.name ?? null,
    image: p.featuredImage?.node?.sourceUrl ?? null,
    size: "small",
  }));
}

// Obtener proyecto individual por slug
export async function getProjectBySlug(slug: string): Promise<WpProjectDetail | null> {
  const query = `
    query ProjectBySlug($id: String!) {
      proyectoBy(uri: $id) {
        id
        slug
        title
        content
        excerpt
        date
        clientUrl
        screenshotUrl
        projectCategories: tiposProyecto {
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
  `;

  try {
    const data = await fetchAPI<{
      proyectoBy?: any | null;
    }>(query, { variables: { id: `/portafolio/${slug}/` } });

    const p = data.proyectoBy;
    if (!p) return null;

    return {
      id: p.id,
      slug: p.slug,
      title: p.title ?? "Proyecto",
      content: p.content ?? null,
      excerpt: p.excerpt ?? null,
      date: p.date ?? null,
      categories: p.projectCategories?.nodes?.map((n: any) => n.name) ?? [],
      featuredImage: mapImage(p.featuredImage?.node),
      seo: {
        title: null,
        description: null,
      },
      clientUrl: p.clientUrl ?? null,
      screenshotUrl: p.screenshotUrl ?? null,
    };
  } catch (error) {
    console.error("Error fetching project by slug:", slug, error);
    return null;
  }
}

// Obtener todos los slugs de proyectos (para generateStaticParams)
export async function getAllProjectSlugs(): Promise<string[]> {
  const query = `
    query AllProjectSlugs {
      proyectos(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `;

  const data = await fetchAPI<{
    proyectos?: { nodes?: any[] } | null;
  }>(query);

  return (data.proyectos?.nodes ?? [])
    .map((p) => p.slug)
    .filter((s): s is string => Boolean(s));
}

// Obtener post individual por slug con categoría
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  // Convertir el slug con categoría a URI: /blog/category/post-name -> /category/post-name/
  const uri = `/${slug}/`;
  
  const query = `
    query PostBySlug($id: ID!) {
      post(id: $id, idType: URI) {
        id
        slug
        title
        content
        excerpt
        date
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
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
  `;

  try {
    const data = await fetchAPI<{
      post?: any | null;
    }>(query, { variables: { id: uri } });

    const p = data.post;
    if (!p) return null;

    return {
      id: p.id,
      slug: p.slug,
      title: p.title ?? "Sin título",
      content: p.content ?? null,
      excerpt: p.excerpt ?? null,
      date: p.date ?? null,
      categories: p.categories?.nodes?.map((n: any) => n.name) ?? [],
      author: p.author?.node ? {
        name: p.author.node.name ?? "Autor",
        avatar: p.author.node.avatar?.url ?? null,
      } : null,
      featuredImage: mapImage(p.featuredImage?.node),
    };
  } catch (error) {
    console.error("Error fetching post by slug:", slug, error);
    return null;
  }
}

// Obtener todos los slugs de posts con categoría (para generateStaticParams)
export async function getAllPostSlugs(): Promise<string[]> {
  const query = `
    query AllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
          categories {
            nodes {
              slug
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI<{
    posts?: { nodes?: any[] } | null;
  }>(query);

  const slugs = (data.posts?.nodes ?? [])
    .map((p) => {
      // Si el post tiene categoría, construir slug con categoría
      const categorySlug = p.categories?.nodes?.[0]?.slug;
      if (categorySlug && p.slug) {
        return `${categorySlug}/${p.slug}`;
      }
      // Si no tiene categoría, retornar solo el slug (fallback)
      return p.slug;
    })
    .filter((s): s is string => Boolean(s));

  console.log("📝 Static posts generated:", slugs.length, "posts");
  console.log("Sample:", slugs.slice(0, 3));
  
  return slugs;
}
