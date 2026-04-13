import type { BlogPost } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const isEven = index % 2 === 0;

  return (
    <a
      href={`/blog/${post.slug}`}
      className="block rounded-xl bg-bg-secondary border border-white/5 p-6 transition-all duration-300 hover:border-qc-teal/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.06)] group"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <p className="text-xs text-text-muted font-mono mb-3">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h3 className="text-lg font-bold font-display text-text-primary group-hover:text-qc-teal transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-sm text-text-secondary">{post.excerpt}</p>
    </a>
  );
}
