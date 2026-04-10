'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden gradient-bg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(243,179,61,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(210,31,60,0.18),transparent_20%)]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your vision into reality?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-8">
            Join the businesses and professionals trusting AD Sky Solution for strategic management, delivery support, and workforce execution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" className="btn-secondary px-10 py-5 text-lg">
              Partner With Us
            </Link>
            <Link href="/jobs" className="px-10 py-5 rounded-full bg-transparent border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 transition-all">
              View Career Portal
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
