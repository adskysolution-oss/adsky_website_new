'use client';

import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Users } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Post Your Project',
    description: 'Define your requirements, timeline, and budget so the platform can match you with qualified workers.',
    icon: Briefcase,
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'Review verified profiles, ratings, and previous work to find the best fit for your needs.',
    icon: Users,
  },
  {
    step: '03',
    title: 'Track and Pay',
    description: 'Monitor progress in real time and release payments securely once work is completed.',
    icon: CheckCircle,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-slate-500">Get started in three simple steps</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <div className="mb-4 text-6xl font-black text-slate-900/10">{item.step}</div>
                <div className="absolute left-0 top-2 flex h-16 w-16 items-center justify-center rounded-full bg-[#2f67ff]/10 text-[#2f67ff] transition group-hover:bg-[#2f67ff]/20">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="pt-20">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-500">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
