'use client';

import { motion } from 'framer-motion';

const topLogos = ['Amazon', 'TATA', 'upGrad', 'Uber', 'Swiggy', 'HDFC', 'ACC', 'Vodafone'];
const bottomLogos = ['Flipkart', 'Zomato', 'PhonePe', 'Paytm', 'OLA', 'BigBasket', 'Myntra', 'Snapdeal'];
const stats = [
  { value: '30 Million+', label: 'Gigs Completed' },
  { value: '1.5 Million+', label: 'Active Workers' },
  { value: '1000+', label: 'Cities' },
  { value: '19000+', label: 'Pin Codes' },
];

function LogoRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-16 ${reverse ? 'trusted-scroll-reverse' : 'trusted-scroll'}`}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex flex-shrink-0 items-center gap-16">
            {items.map((item) => (
              <div key={`${copy}-${item}`} className="flex-shrink-0 px-2 text-2xl font-bold text-slate-500/75 transition hover:text-slate-800">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedBySection() {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(47,103,255,0.05),#ffffff_28%)] px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Trusted by 775+ large enterprises</h2>
        </motion.div>

        <div className="mt-12 space-y-8">
          <LogoRow items={topLogos} />
          <LogoRow items={bottomLogos} reverse />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-extrabold tracking-[-0.05em] text-slate-900 sm:text-4xl">{item.value}</div>
              <p className="mt-2 text-sm text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
