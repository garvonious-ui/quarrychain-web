import PageHero from "@/components/layout/PageHero";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";
import BlurFade from "@/components/ui/blur-fade";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-16">
      <PageHero
        label="Blog"
        headline="Updates"
        subheadline="News and updates from the QuarryChain team."
        shape="icosahedron"
        shapeColors={{ primary: "#60a5fa", secondary: "#14b8a6" }}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-4">
            {posts.map((post, i) => (
              <BlurFade key={post.slug} delay={0.05 + i * 0.08}>
                <PostCard post={post} index={i} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
