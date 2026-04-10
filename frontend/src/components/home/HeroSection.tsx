'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const capabilities = [
  'Manpower Expert',
  'Auditors',
  'Data Annotators',
  'Mentors',
  'Promoters',
  'Telecallers',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-bg pt-24 pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(210,31,60,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(61,122,224,0.2),transparent_28%)]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="text-left">
            <div className="eyebrow mb-6">
              <span className="h-2 w-2 rounded-full bg-[#ff6580]" />
              Integrated IT Solutions & Workforce Consulting
            </div>

            <h1 className="heading-xl max-w-4xl text-white">
              Fuel Your Future
              <br className="hidden md:block" />
              With Expert Strategy.
            </h1>

            <p className="mt-6 mb-10 max-w-2xl text-lg md:text-xl leading-8 text-blue-100/90">
              Delivering expert IT consulting, software development, and professional staffing solutions for businesses that need reliable execution at scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-secondary px-8 py-4 text-center text-sm uppercase tracking-[0.18em]">
                Book IT Consultation
              </Link>
              <Link href="/services" className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/16">
                Explore Our Services
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="brand-card p-5">
                <p className="text-3xl font-extrabold text-white">99%</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-blue-100/70">Success Rate</p>
              </div>
              <div className="brand-card p-5">
                <p className="text-3xl font-extrabold text-white">120+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-blue-100/70">Cities Covered</p>
              </div>
              <div className="brand-card p-5">
                <p className="text-3xl font-extrabold text-white">5M+</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-blue-100/70">Strong Workforce</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="brand-card overflow-hidden p-4">
              <div className="relative min-h-[520px] rounded-[1.4rem] border border-white/10 bg-[#0d2345] p-6">
                <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09152a] via-[#0b2042]/80 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3">
                    {capabilities.map((item, index) => (
                      <div key={item} className={`rounded-2xl border border-white/10 p-4 text-white ${index === 0 ? 'bg-white/14' : 'bg-white/8'}`}>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100/70">Capability</p>
                        <p className="mt-2 text-lg font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-3xl border border-white/10 bg-[#081a34]/90 p-6 text-white shadow-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff8ea1]">Strategic Technical Advisory</p>
                    <h3 className="mt-3 text-2xl font-extrabold leading-tight">Website & App Strategy Consultation, CRM/HRMS Setup, and Process Automation guidance.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
