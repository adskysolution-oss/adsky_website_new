'use client';
import { motion } from 'framer-motion';
import { Database, Search, GraduationCap, Users } from 'lucide-react';

const solutions = [
  {
    title: 'Data Annotation',
    icon: Database,
    desc: 'AI/ML-ready data annotation, tech-scaled for accuracy. Over 10Mn+ data points labeled monthly for LLMs & Vision models.',
    link: '/business/data-annotation'
  },
  {
    title: 'Auditing Services',
    icon: Search,
    desc: 'Full audits for stocks, compliance, and competition via mystery audits. Capture up to 25+ data points heavily reducing seller claims.',
    link: '/business/audit'
  },
  {
    title: 'EdTech Solutions',
    icon: GraduationCap,
    desc: 'Full-cycle EdTech operational layer: from educator onboarding, lab assistants, to evaluation workflows.',
    link: '/business/edtech'
  },
  {
    title: 'Promoter Deployment',
    icon: Users,
    desc: 'Deploy on-ground forces to convert prospects. In-store and out-store promotions tailored to drive exponential sales.',
    link: '/business/promoter-deployment'
  }
];

export default function SolutionsSection() {
  return (
    <section className="section-container bg-white dark:bg-[#0b1120]">
      <div className="text-center mb-16">
        <h2 className="heading-md mb-4 text-gray-900 dark:text-white">Our Business <span className="text-primary">Solutions</span></h2>
        <p className="subtext text-gray-600 dark:text-gray-400">Scale operations without scaling your internal HR overhead.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutions.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 dark:bg-dark-surface dark:border-gray-800 dark:hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
              {item.desc}
            </p>
            <a href={item.link} className="text-primary font-semibold flex items-center group-hover:underline">
              Know More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
