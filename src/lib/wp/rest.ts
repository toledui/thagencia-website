import { getWpBaseUrl } from "./config";
import type { WpPost } from "./types";

type FetchJsonOptions = {
  revalidateSeconds?: number;
};

async function fetchWpJson<T>(path: string, options: FetchJsonOptions = {}): Promise<T> {
  const baseUrl = getWpBaseUrl();
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_WP_BASE_URL no está configurado");
  }

  const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidateSeconds ?? 60,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WP REST error ${res.status} ${res.statusText}: ${body}`);
  }

  return (await res.json()) as T;
}

export async function getLatestPosts(limit = 6): Promise<WpPost[]> {
  // WP REST: /wp-json/wp/v2/posts
  // _fields limita payload
  const params = new URLSearchParams({
    per_page: String(limit),
    _fields: "id,slug,link,date,title,excerpt",
  });

  return fetchWpJson<WpPost[]>(`/wp-json/wp/v2/posts?${params.toString()}`);
}
