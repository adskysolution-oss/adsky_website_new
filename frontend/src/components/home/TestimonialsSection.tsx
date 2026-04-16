'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: 'We expanded field execution across multiple cities without building a huge internal ops layer. The delivery structure feels enterprise-ready.',
    author: 'Ashwin M.',
    role: 'Gig Partner',
  },
  {
    text: 'The consulting and staffing mix helped us move from planning mode to real execution much faster than our internal team could have alone.',
    author: 'Neha K.',
    role: 'Operations Lead',
  },
  {
    text: 'What stands out is the blend of strategic clarity and practical follow-through. It feels closer to a delivery partner than a generic marketplace.',
    author: 'Raghav T.',
    role: 'Founder, Growth Venture',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-container py-20">
      <div className="text-center mb-16">
        <p className="eyebrow eyebrow-light mb-5">What People Say</p>
        <h2 className="heading-md mb-4 text-gray-900">Built for scale. Trusted by operators and talent.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="brand-card-light relative p-8"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-[#0a2d67]/10" />
            <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed text-lg">
              &quot;{t.text}&quot;
            </p>
            <div className="flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0a2d67,#d21f3c)] text-xl font-bold text-white shadow-sm">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{t.author}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
