import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown to HTML (headers, paragraphs, links, bold, lists)
  const html = post.content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold font-display text-text-primary mt-10 mb-4">${trimmed.slice(3)}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3 class="text-xl font-bold font-display text-text-primary mt-8 mb-3">${trimmed.slice(4)}</h3>`;
      }
      // Process inline markdown
      let processed = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-qc-teal hover:underline">$1</a>');
      return `<p class="text-text-secondary leading-relaxed mb-4">${processed}</p>`;
    })
    .join("\n");

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-2xl">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-qc-teal transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </a>

        <h1 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-text-muted font-mono mb-12">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{post.author}</span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
