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
};

export type WpProject = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  category?: string | null;
  featuredImage?: WpImage | null;
};
