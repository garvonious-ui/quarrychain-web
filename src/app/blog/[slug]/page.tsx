import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

function mdxToHtml(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold font-display text-text-primary mt-10 mb-4">${trimmed.slice(3)}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3 class="text-xl font-bold font-display text-text-primary mt-8 mb-3">${trimmed.slice(4)}</h3>`;
      }
      let processed = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-qc-teal hover:underline">$1</a>');
      return `<p class="text-text-secondary leading-relaxed mb-4">${processed}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const isPortableText = post.isSanity && Array.isArray(post.content);

  const heroImageUrl =
    post.coverImage && urlFor(post.coverImage as never)
      ? urlFor(post.coverImage as never)?.width(1600).height(900).fit("crop").url()
      : null;

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

        <div className="flex items-center gap-3 text-sm text-text-muted font-mono mb-8">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>&middot;</span>
          <span>{post.author}</span>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>

        {heroImageUrl && (
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-bg-tertiary border border-white/5 mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {isPortableText ? (
          <PortableTextRenderer value={post.content as unknown[]} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: mdxToHtml(post.content as string) }} />
        )}
      </article>
    </div>
  );
}
