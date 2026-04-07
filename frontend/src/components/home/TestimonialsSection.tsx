'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "WorkHustle transformed how we scale our ground ops. We went from executing in 2 cities to 40 cities within a single month without hiring internal HR.",
    author: "Rohan M.",
    role: "VP Operations, QuickCommerce",
  },
  {
    text: "The data annotation quality is unparalleled. Their managed workforce acts like an extension of our own AI training team. 99% accuracy is entirely real.",
    author: "Sneha K.",
    role: "Lead ML Engineer, AI Startup",
  },
  {
    text: "Getting our tech capability center up in just 2 weeks sounded impossible until they delivered it. A lifesaver for rapid software development.",
    author: "Amit T.",
    role: "CTO, Fintech Enterprise",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-container bg-white dark:bg-dark-surface">
      <div className="text-center mb-16">
        <h2 className="heading-md mb-4 text-gray-900 dark:text-white">Built for <span className="text-primary">Scale.</span> Loved by Leaders.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="p-8 rounded-2xl bg-gray-50 dark:bg-[#151c2e] border border-gray-100 dark:border-gray-800 relative"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 dark:text-primary/20" />
            <p className="text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed text-lg">
              "{t.text}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-primary flex items-center justify-center font-bold text-xl mr-4 shadow-sm">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{t.author}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
