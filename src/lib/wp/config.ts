export function getWpBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_WP_BASE_URL;
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}
