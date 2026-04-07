'use client';
import { motion } from 'framer-motion';

const LOGOS = ['Tata 1mg', 'Swiggy', 'Zomato', 'Reliance', 'Amazon', 'Flipkart', 'BigBasket'];

export default function TrustedBySection() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 dark:bg-[#0b1120] dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-8">
          Trusted by 100+ Leading Enterprises
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {LOGOS.map((logo, idx) => (
            <motion.div 
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-xl md:text-2xl font-bold font-sans tracking-tight text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-300 transition-colors cursor-default"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
