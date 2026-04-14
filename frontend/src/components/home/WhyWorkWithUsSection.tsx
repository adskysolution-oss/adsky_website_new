'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Award, Clock3, DollarSign, Shield, Zap } from 'lucide-react';

const features = [
  {
    title: 'Flexible Work Schedule',
    description: 'Go online or schedule your work. Choose your work location and get the benefits of a more flexible operating model.',
    icon: Clock3,
    color: 'bg-emerald-400',
  },
  {
    title: 'Weekly Payouts',
    description: 'Get paid weekly with fewer delays and clearer expectations around compensation, milestones, and delivery.',
    icon: DollarSign,
    color: 'bg-sky-400',
  },
  {
    title: 'Verified and Secure',
    description: 'All opportunities are verified and the experience is designed to feel more trusted for both workers and businesses.',
    icon: Shield,
    color: 'bg-violet-400',
  },
  {
    title: 'Skill Development',
    description: 'Training programs and certification-led pathways help workers grow from one role type into the next.',
    icon: Award,
    color: 'bg-orange-400',
  },
  {
    title: 'Instant Matching',
    description: 'A clearer product layer can connect the right people to the right projects faster without looking chaotic.',
    icon: Zap,
    color: 'bg-amber-400',
  },
];

export default function WhyWorkWithUsSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const CurrentIcon = features[selectedFeature].icon;

  return (
    <section className="bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Why work with us?</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#102949_0%,#18395f_48%,#0d2137_100%)] shadow-[0_28px_80px_rgba(15,40,71,0.24)]"
        >
          <div className="grid min-h-[520px] lg:grid-cols-2">
            <div className="relative flex items-center justify-center p-10 sm:p-12">
              <div className="relative text-center">
                <motion.div
                  key={selectedFeature}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-white backdrop-blur-sm"
                >
                  <CurrentIcon className="h-16 w-16" />
                </motion.div>
                <div className="flex justify-center gap-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <button
                        key={feature.title}
                        onClick={() => setSelectedFeature(index)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                          selectedFeature === index ? `${feature.color} scale-110 text-white shadow-lg` : 'bg-white/20 text-white/65 hover:bg-white/30'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-sky-400/10 blur-2xl" />
              <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-violet-400/12 blur-3xl" />
            </div>

            <div className="relative flex flex-col justify-center bg-[linear-gradient(135deg,#17385b_0%,#102949_100%)] p-10 text-white sm:p-12">
              <div className="mb-8 flex gap-3">
                <span className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-white">Workers</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/72">For Business</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={features[selectedFeature].title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-3xl font-bold tracking-[-0.03em] sm:text-[2rem]">{features[selectedFeature].title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-8 text-white/82">{features[selectedFeature].description}</p>
                  <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-semibold text-[#102949] transition hover:shadow-xl">
                    Know More
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[linear-gradient(135deg,rgba(52,211,153,0.24),rgba(59,130,246,0.18))] blur-3xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
