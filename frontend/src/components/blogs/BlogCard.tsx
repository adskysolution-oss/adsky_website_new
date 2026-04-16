import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blogs';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-[#e5e7eb]">
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized={post.image.startsWith('http')}
          />
        </div>
      </Link>

      <div className="flex min-h-[270px] flex-col px-6 py-6 !p-[5%]">
        <div className="flex flex-wrap items-center gap-3 text-[0.82rem] font-medium text-[#64748b]">
          <span className="rounded-full bg-[#eff3f9] px-3 py-1 text-[#17356c]">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <Link href={`/blogs/${post.slug}`} className="mt-4 block">
          <h3 className="text-[1.35rem] font-semibold leading-[1.25] tracking-[-0.03em] text-[#111827] transition-colors group-hover:text-[#17356c]">
            {post.title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 text-[0.98rem] leading-7 text-[#667085]">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="text-[0.92rem] font-medium text-[#334155]">{post.author}</div>
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#17356c] transition-colors hover:text-[#0f2a56]"
          >
            Read More
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
