export type WpRenderedText = {
  rendered?: string;
};

export type WpPost = {
  id: number;
  slug: string;
  link?: string;
  date?: string;
  title?: WpRenderedText;
  excerpt?: WpRenderedText;
};
