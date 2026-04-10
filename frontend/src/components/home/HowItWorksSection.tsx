'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Project Configuration on App',
    desc: 'We configure the task, hiring, or consulting engagement inside the platform and align the right delivery workflow quickly.',
  },
  {
    num: '02',
    title: 'Task Allocation and Fulfillment',
    desc: 'Our workflow engine distributes execution rapidly while project oversight and quality checks keep outputs dependable.',
  },
  {
    num: '03',
    title: 'Quality Review and Reporting',
    desc: 'Operational dashboards, checkpoints, and manual validations help clients monitor outcomes without managing every detail.',
  },
  {
    num: '04',
    title: 'Payment and Completion',
    desc: 'Structured completion milestones and payout workflows help keep projects moving with transparency and accountability.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-container border-t border-[#dbe4f1] py-20">
      <div className="text-center mb-20">
        <p className="eyebrow eyebrow-light mb-5">How It Works</p>
        <h2 className="heading-md mb-4 text-gray-900">Reliable execution of your core business operations.</h2>
        <p className="subtext mx-auto max-w-3xl">The visual structure follows the same step-led story as the reference: configuration, allocation, fulfillment, and payout.</p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-7 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#cfd9ea] to-transparent z-0" />

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
              <div className="number-pill mb-6 relative z-10 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="brand-card-light p-7">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-500">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
