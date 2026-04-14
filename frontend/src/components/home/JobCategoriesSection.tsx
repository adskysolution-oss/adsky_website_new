'use client';

import { motion } from 'framer-motion';

const categories = [
  { title: 'Delivery Partner', count: '15,000+ Jobs', color: 'bg-amber-400', position: 'left-[0%] top-[0%]' },
  { title: 'Field Survey Jobs', count: '8,500+ Jobs', color: 'bg-emerald-400', position: 'right-[0%] top-[0%]' },
  { title: 'Data Entry Jobs', count: '12,000+ Jobs', color: 'bg-amber-400', position: 'left-[14%] top-[23%]' },
  { title: 'Sales and Marketing', count: '9,200+ Jobs', color: 'bg-emerald-400', position: 'right-[10%] top-[24%]' },
  { title: 'Tele-calling', count: '7,800+ Jobs', color: 'bg-emerald-400', position: 'left-[0%] top-[48%]' },
  { title: 'Recruitment', count: '5,400+ Jobs', color: 'bg-amber-400', position: 'right-[5%] top-[50%]' },
  { title: 'Background Verification', count: '6,100+ Jobs', color: 'bg-emerald-400', position: 'left-[18%] top-[74%]' },
  { title: 'Design Services', count: '4,900+ Jobs', color: 'bg-amber-400', position: 'right-[15%] top-[76%]' },
];

export default function JobCategoriesSection() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(135deg,#2f67ff_0%,#2458e6_38%,#1d4fda_100%)] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Job Categories</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/88">
            Explore opportunities across diverse sectors and find the closest fit for your skills, schedule, and preferred kind of work.
          </p>
        </div>

        <div className="relative h-[520px]">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.65, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.06, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`absolute rounded-3xl bg-[#1a1a2e] p-5 shadow-[0_26px_50px_rgba(7,18,36,0.26)] ${category.position}`}
            >
              <h3 className="max-w-[180px] text-lg font-semibold leading-6 text-white">{category.title}</h3>
              <div className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold text-slate-950 ${category.color}`}>
                {category.count}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
