'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  'Generative Video Data for GenAI',
  'Data Annotation Services',
  'AI-first Tech Capability',
  'Promoter Deployment',
  'Audit and Merchandising',
  'Content Moderation',
];

export default function SolutionsSection() {
  return (
    <section className="bg-[linear-gradient(135deg,#17181c_0%,#1f232b_36%,#13171f_100%)] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Cognitive, desk-based, tech-centric</h2>
          <p className="mt-4 text-lg text-white/78">Advanced solutions powered by technology and human expertise</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-[1.6rem] border border-white/16 bg-white/8 p-6 backdrop-blur-sm transition hover:border-amber-400/55"
            >
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{service}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">
                High-quality delivery systems, structured operations, and more confident scale for teams that need better workforce execution.
              </p>
              <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:gap-3">
                Know More
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
