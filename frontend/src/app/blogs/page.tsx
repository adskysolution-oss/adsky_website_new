'use client';

import { useMemo, useState } from 'react';
import BlogCard from '@/components/blogs/BlogCard';
import BlogFilters from '@/components/blogs/BlogFilters';
import FeaturedBlogCard from '@/components/blogs/FeaturedBlogCard';
import { blogCategories, blogPosts, getFeaturedBlog, type BlogCategory } from '@/lib/blogs';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const featuredPost = getFeaturedBlog();

  const filteredPosts = useMemo(() => {
    const remainingPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);

    if (activeCategory === 'All') {
      return remainingPosts;
    }

    return remainingPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, featuredPost.slug]);

  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <Section variant="transparent" spacing="lg" className="bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.10),transparent_38%),linear-gradient(180deg,#ffffff_0%,#f7f8fb_100%)]">
        <div className="mx-auto max-w-[1220px]">
          <div className="mx-auto max-w-[860px] text-center">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#17356c] ring-1 ring-[#e6eaf2]">
              AD Sky Blogs
            </span>
            <h1 className="mt-6 text-[3rem] font-semibold tracking-[-0.05em] text-[#101828] sm:text-[3.7rem]">
              Smarter Work, Better Careers, Stronger Operations
            </h1>
            <p className="mx-auto mt-6 max-w-[740px] text-[1.08rem] leading-8 text-[#667085]">
              Explore interview guides, workforce insights, platform stories, and operating playbooks inspired by how modern
              teams and professionals grow with AD Sky Solution.
            </p>
          </div>

          <div className="mt-12">
            <BlogFilters categories={blogCategories} activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          <div className="mt-14">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        </div>
      </Section>

      <Section variant="lightGray" spacing="md">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-[#101828]">Latest Articles</h2>
              <p className="mt-2 text-[1rem] leading-7 text-[#667085]">
                Curated reads for job seekers, enterprise teams, and workforce operators.
              </p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-[0.92rem] font-medium text-[#475467] ring-1 ring-[#e4e7ec]">
              {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              type="button"
              size="md"
              variant="primary"
              className="bg-[#101828] text-white hover:bg-[#1d2939]"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
