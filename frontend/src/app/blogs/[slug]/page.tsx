import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/blogs/BlogCard';
import { blogPosts, getRelatedBlogs } from '@/lib/blogs';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogs(post.slug);

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-6 pb-24 pt-24 lg:px-8 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-[1100px]">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#17356c] hover:text-[#102a56]">
          <span aria-hidden="true">←</span>
          Back to Blogs
        </Link>

        <div className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="aspect-[16/8] bg-[#d0d5dd]">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
          <div className="px-8 py-10 sm:px-12 sm:py-12">
            <div className="flex flex-wrap items-center gap-3 text-[0.86rem] font-medium text-[#667085]">
              <span className="rounded-full bg-[#eff3f9] px-3 py-1 text-[#17356c]">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
              <span>{post.author}</span>
            </div>

            <h1 className="mt-6 max-w-[820px] text-[2.8rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[#101828] sm:text-[3.3rem]">
              {post.title}
            </h1>

            <p className="mt-6 max-w-[800px] text-[1.08rem] leading-8 text-[#667085]">{post.excerpt}</p>

            <div className="mt-10 space-y-6 text-[1.02rem] leading-8 text-[#344054]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-[#101828]">Related Articles</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
