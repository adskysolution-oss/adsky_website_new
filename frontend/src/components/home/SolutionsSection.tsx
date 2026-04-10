'use client';
import { motion } from 'framer-motion';
import { Bot, Building2, Database, Headphones } from 'lucide-react';

const solutions = [
  {
    title: 'Egocentric Video Data for Robotics',
    icon: Bot,
    desc: 'Human POV datasets built for imitation learning, embodied AI, and robotics teams that need scale with quality control.',
    link: '/business',
  },
  {
    title: 'Data Annotation',
    icon: Database,
    desc: 'AI and ML ready annotation pipelines for images, text, speech, and video with process-led quality checks.',
    link: '/business',
  },
  {
    title: 'AI-First Tech Capability Centers',
    icon: Building2,
    desc: 'On-site, time-zone aligned developers and operations pods for businesses moving quickly into AI-led delivery.',
    link: '/business',
  },
  {
    title: 'Strategic Advisory & Support',
    icon: Headphones,
    desc: 'Consultation-led delivery spanning web and app strategy, HRMS and CRM setup, and process automation planning.',
    link: '/services',
  },
];

export default function SolutionsSection() {
  return (
    <section className="section-container py-20">
      <div className="text-center mb-16">
        <p className="eyebrow eyebrow-light mb-5">Our Offerings</p>
        <h2 className="heading-md mb-4 text-gray-900">Cognitive, desk-based, tech-centric delivery.</h2>
        <p className="subtext mx-auto max-w-3xl">Built to echo the reference site&apos;s structured service grid while adapting it to this app&apos;s marketplace footprint.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {solutions.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group brand-card-light p-6 md:p-8 transition-all duration-300 h-full flex flex-col hover:-translate-y-2"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0a2d67,#1f58b2)] text-white shadow-[0_14px_30px_rgba(10,45,103,0.22)] group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
            <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
              {item.desc}
            </p>
            <a href={item.link} className="text-[#0a2d67] font-semibold flex items-center group-hover:underline">
              Know More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
