import { getSanityClient } from "./client";

// GROQ queries

const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  "date": publishedAt,
  "author": author,
  excerpt,
  coverImage,
  "content": body,
  "readingTime": string(round(length(pt::text(body)) / 5 / 200)) + " min read"
}`;

const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  "date": publishedAt,
  "author": author,
  excerpt,
  coverImage,
  "content": body,
  "readingTime": string(round(length(pt::text(body)) / 5 / 200)) + " min read"
}`;

const ALL_SLUGS_QUERY = `*[_type == "blogPost"].slug.current`;

export interface SanityBlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage?: unknown;
  content: unknown[]; // Portable Text blocks
  readingTime: string;
}

export async function sanityGetAllPosts(): Promise<SanityBlogPost[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(POSTS_QUERY);
}

export async function sanityGetPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function sanityGetAllSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(ALL_SLUGS_QUERY);
}
