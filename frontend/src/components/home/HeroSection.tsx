'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0b1120] pt-24 pb-20 lg:pt-36 lg:pb-28">
      {/* Background visual cues */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800">
            <span>🚀 India's Largest Enterprise Gig & IT Platform</span>
          </div>

          <h1 className="heading-lg text-gray-900 dark:text-white max-w-4xl mx-auto">
            Scale your workforce team <br className="hidden md:block"/>
            <span className="text-primary">faster than ever.</span>
          </h1>
          
          <p className="subtext mt-6 mb-10 text-lg md:text-xl max-w-2xl">
            Whether you need to outsource on-ground field execution or hire an elite IT vendor, WorkHustle empowers you to scale effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/business" className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold shadow-lg hover:shadow-primary/30 transition-all">
              For Business
            </Link>
            <Link href="/jobs" className="px-8 py-4 rounded-lg bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-primary font-semibold shadow-sm transition-all focus:ring-2 focus:ring-primary">
              Find Jobs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
