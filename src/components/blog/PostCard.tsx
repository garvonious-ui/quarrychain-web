import type { BlogPost } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="block rounded-xl bg-bg-secondary border border-white/5 p-6 transition-all duration-300 hover:border-qc-teal/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.06)] group"
    >
      <div className="flex items-center gap-3 mb-3">
        <p className="text-xs text-text-muted font-mono">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <span className="text-text-muted">·</span>
        <p className="text-xs text-text-muted font-mono">{post.readingTime}</p>
      </div>
      <h3 className="text-lg font-bold font-display text-text-primary group-hover:text-qc-teal transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-text-secondary">{post.excerpt}</p>
    </a>
  );
}
