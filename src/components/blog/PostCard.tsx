import type { BlogPost } from "@/lib/blog";
import { urlFor } from "@/lib/sanity/image";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl =
    post.coverImage && urlFor(post.coverImage as never)
      ? urlFor(post.coverImage as never)?.width(800).height(420).fit("crop").url()
      : null;

  return (
    <a
      href={`/blog/${post.slug}`}
      className="block rounded-xl bg-bg-secondary border border-white/5 overflow-hidden transition-all duration-300 hover:border-qc-teal/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.06)] group"
    >
      {imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-bg-tertiary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs text-text-muted font-mono">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <span className="text-text-muted">&middot;</span>
          <p className="text-xs text-text-muted font-mono">{post.readingTime}</p>
        </div>
        <h3 className="text-lg font-bold font-display text-text-primary group-hover:text-qc-teal transition-colors mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary">{post.excerpt}</p>
      </div>
    </a>
  );
}
