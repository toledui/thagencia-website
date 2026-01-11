const WP_API_URL = process.env.WORDPRESS_API_URL;

if (!WP_API_URL) {
  console.warn("WORDPRESS_API_URL no está configurado; las consultas GraphQL fallarán.");
}

type GraphQLErrorItem = { message: string };

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLErrorItem[];
};

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!WP_API_URL) {
    throw new Error("Falta WORDPRESS_API_URL en el entorno");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = process.env.WORDPRESS_AUTH_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(WP_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    // Revalidar cada 60s; ajustable según necesidad
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GraphQL HTTP ${res.status}: ${body}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(" | "));
  }

  if (!json.data) {
    throw new Error("Respuesta GraphQL sin 'data'");
  }

  return json.data;
}
