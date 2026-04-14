import Link from 'next/link';
import type { BlogPost } from '@/lib/blogs';

export default function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-[34px] bg-[#0f172a] text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between px-8 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[0.82rem] font-medium text-white/72">
              <span className="rounded-full bg-[#c9ff45] px-3 py-1 text-[#111827]">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mt-6 max-w-[560px] text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.6rem]">
              {post.title}
            </h2>
            <p className="mt-6 max-w-[540px] text-[1.02rem] leading-8 text-white/78">{post.excerpt}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[0.85rem] text-white/60">Written by</div>
              <div className="mt-1 text-[1rem] font-semibold text-white">{post.author}</div>
            </div>
            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[0.95rem] font-semibold text-[#101828] transition-transform hover:scale-[1.02]"
            >
              Read Article
            </Link>
          </div>
        </div>

        <Link href={`/blogs/${post.slug}`} className="block min-h-[320px] bg-[#111827]">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </Link>
      </div>
    </article>
  );
}
