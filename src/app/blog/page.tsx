import PageHero from "@/components/layout/PageHero";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";
import BlurFade from "@/components/ui/blur-fade";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-16">
      <PageHero
        label="Blog"
        headline="Updates"
        subheadline="News and updates from the QuarryChain team."
        shape="icosahedron"
        shapeColors={{ primary: "#ef4444", secondary: "#3b82f6", tertiary: "#22c55e" }}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl">
          <BlurFade>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-qc-red font-mono mb-4">Latest</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary">From the <span className="text-transparent bg-clip-text bg-gradient-to-r from-qc-red to-qc-blue">QuarryChain team.</span></h2>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
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
