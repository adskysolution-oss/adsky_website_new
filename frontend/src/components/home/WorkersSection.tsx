'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

const workerFeatures = [
  'Work from anywhere, anytime',
  'Weekly payouts with zero delays',
  'Skill development programs',
  'Build your professional portfolio',
];

export default function WorkersSection() {
  return (
    <section className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="order-2 overflow-hidden rounded-[1.8rem] shadow-[0_28px_80px_rgba(15,40,71,0.14)] lg:order-1"
        >
          <img
            src="https://images.unsplash.com/photo-1714976326831-660970f3de8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
            alt="Professionals working"
            className="h-[360px] w-full object-cover sm:h-[430px] lg:h-[500px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Earn on Your Terms</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            Join millions earning flexible income. Choose projects that match your skills and schedule.
          </p>
          <div className="mt-8 space-y-4">
            {workerFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-center gap-3"
              >
                <TrendingUp className="h-6 w-6 flex-shrink-0 text-[#2f67ff]" />
                <span className="text-base text-slate-800">{feature}</span>
              </motion.div>
            ))}
          </div>
          <Link
            href="/jobs"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#111827] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
          >
            Join as Worker
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
