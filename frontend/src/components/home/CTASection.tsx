'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary dark:bg-[#004bb8]">
      {/* Abstract Waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-[30%] -top-[20%] w-[150%] h-[150%]" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,50 C30,10 70,90 100,50 L100,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to revolutionize your execution?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of gig workers and leading enterprises. One platform for end-to-end work lifecycle.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/business/register" className="px-10 py-5 rounded-lg bg-white text-primary font-bold text-lg shadow-2xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
              Hire Workforce
            </Link>
            <Link href="/jobs" className="px-10 py-5 rounded-lg bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all">
              Explore Job Openings
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
