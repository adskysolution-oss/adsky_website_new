'use client';
import { motion } from 'framer-motion';

const METRICS = [
  { value: '10K+', label: 'Tasks Completed' },
  { value: '5M+', label: 'Strong Workforce' },
  { value: '120+', label: 'Cities Covered' },
  { value: '4K+', label: 'Pin Codes' },
];

export default function TrustedBySection() {
  return (
    <section className="border-y border-[#dbe4f1] bg-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow eyebrow-light mb-4">Digital Transformation Excellence</p>
          <h2 className="heading-md text-[#10213f]">Execution strength built for scale.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="brand-card-light p-7 text-center"
            >
              <div className="text-4xl font-extrabold tracking-[-0.04em] text-[#0a2d67]">{item.value}</div>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#66789b]">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
