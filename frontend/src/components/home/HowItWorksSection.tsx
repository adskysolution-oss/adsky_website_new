'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Share Requirements',
    desc: 'Tell us exactly what business operation you want to execute or the specific skill you need to hire.'
  },
  {
    num: '02',
    title: 'We Source & Match',
    desc: 'Our engine matches your needs with our network of 1.5M+ pre-verified professionals within 48 hours.'
  },
  {
    num: '03',
    title: 'Execution & Management',
    desc: 'The workers execute on the ground while our project managers oversee quality, tracking KPIs in real-time.'
  },
  {
    num: '04',
    title: 'Delivery & Payment',
    desc: 'You only pay for successful milestones or delivered outcomes. Escrow ensures full financial security.'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="section-container bg-slate-50 dark:bg-dark-bg border-t border-gray-200 dark:border-gray-800">
      <div className="text-center mb-20">
        <h2 className="heading-md mb-4 text-gray-900 dark:text-white">How WorkHustle <span className="text-primary">Works</span></h2>
        <p className="subtext">From complex gig-sourcing to streamlined enterprise delivery.</p>
      </div>

      <div className="relative">
        {/* Connection pipeline line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 via-primary to-blue-100 dark:from-gray-800 dark:via-primary/50 dark:to-gray-800 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10 lg:px-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white dark:bg-dark-surface border-4 border-gray-50 dark:border-dark-bg shadow-xl flex items-center justify-center text-2xl font-bold text-primary mb-6 relative group-hover:scale-110 transition-transform z-10">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
