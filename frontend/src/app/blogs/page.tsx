'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

const featuredPost = {
  id: 'future-of-gig',
  title: 'How Enterprise Gig Economies are Reshaping traditional HR overheads',
  excerpt: 'A comprehensive guide into how modern companies leverage tech-driven workforce algorithms to cut fixed HR costs by over 45% while retaining velocity.',
  category: 'Enterprise Strategy',
  author: 'Annanya S.',
  date: 'Oct 24, 2024',
  readTime: '6 min read',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
};

const posts = [
  {
    id: 'ai-data-annotation',
    title: 'Scaling AI Models: Why Human-in-the-Loop Data Annotation isn\'t dead.',
    category: 'AI & Data',
    author: 'Vikram R.',
    date: 'Oct 18, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'field-ops-hacks',
    title: '5 Metrics Every Ground Operations Manager Needs to Track',
    category: 'Operations',
    author: 'Rahul T.',
    date: 'Oct 12, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gig-worker-rights',
    title: 'The Evolution of Gig Worker Flexibility and Benefits in India',
    category: 'Workforce',
    author: 'Smriti M.',
    date: 'Oct 05, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogsPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="heading-lg text-gray-900 dark:text-white mb-6">Insights & <span className="text-primary">Resources</span></h1>
        <p className="subtext">Deep dives into workforce management, enterprise scaling, and gig economy trends.</p>
      </div>

      {/* Featured Blog */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 shadow-lg group flex flex-col lg:flex-row"
      >
        <div className="lg:w-3/5 h-64 lg:h-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
          <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="text-primary font-bold text-sm tracking-widest uppercase mb-4">{featuredPost.category}</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-3">{featuredPost.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{featuredPost.excerpt}</p>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
            <span className="flex items-center"><User className="w-4 h-4 mr-1"/> {featuredPost.author}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {featuredPost.date}</span>
          </div>

          <Link href={`/blogs/${featuredPost.id}`} className="mt-auto inline-flex items-center text-primary font-semibold hover:text-primary-hover transition-colors">
            Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Recent Posts Grid */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">Recent Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col rounded-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className="h-48 overflow-hidden">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
               <div className="text-primary font-semibold text-xs tracking-wider uppercase mb-3">{post.category}</div>
               <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h4>
               
               <div className="mt-auto pt-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                 <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1"/> {post.date}</span>
                 <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1"/> {post.readTime}</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
