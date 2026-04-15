import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isSanityConfigured } from "./sanity/client";
import {
  sanityGetAllPosts,
  sanityGetPostBySlug,
  sanityGetAllSlugs,
  type SanityBlogPost,
} from "./sanity/queries";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage?: unknown;
  content: string | unknown[]; // string for MDX, Portable Text blocks for Sanity
  readingTime: string;
  isSanity?: boolean;
}

// ===== MDX (file-based) fallback =====

function mdxGetAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const words = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      author: data.author || "QuarryChain Team",
      excerpt: data.excerpt || "",
      content,
      readingTime,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function mdxGetPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const words = content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    author: data.author || "QuarryChain Team",
    excerpt: data.excerpt || "",
    content,
    readingTime,
  };
}

function mdxGetAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// ===== Dual-mode public API =====

function sanityToPost(p: SanityBlogPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    author: p.author,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    content: p.content,
    readingTime: p.readingTime || "1 min read",
    isSanity: true,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured()) {
    const posts = await sanityGetAllPosts();
    return posts.map(sanityToPost);
  }
  return mdxGetAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured()) {
    const post = await sanityGetPostBySlug(slug);
    return post ? sanityToPost(post) : null;
  }
  return mdxGetPostBySlug(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  if (isSanityConfigured()) {
    return sanityGetAllSlugs();
  }
  return mdxGetAllSlugs();
}
