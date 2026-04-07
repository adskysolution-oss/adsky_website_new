'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BarChart3, Database, ShieldCheck, GraduationCap, Building2 } from 'lucide-react';

const businessSolutions = [
  {
    title: 'Data Annotation',
    icon: Database,
    desc: 'High-quality, ML-ready data annotation for AI. We label over 10Mn+ data points monthly with 99%+ accuracy across image, text, and video.',
  },
  {
    title: 'Audit & Quality Assurance',
    icon: ShieldCheck,
    desc: 'Comprehensive execution covering 4000+ audit parameters. We handle mystery audits, stock, and compliance, reducing seller claims by up to 50%.',
  },
  {
    title: 'Promoter Deployment',
    icon: BarChart3,
    desc: 'Deploy target-driven local promoters focused on high-quality lead generation, BTL activities, and strategic up-selling for retail and FMCG.',
  },
  {
    title: 'EdTech Educator Sourcing',
    icon: GraduationCap,
    desc: 'Access our network of 500+ professional educators. Instantly scale evaluations, onboard expert tutors, and hire reliable lab assistants.',
  },
  {
    title: 'AI-First Tech Capability Centers',
    icon: Building2,
    desc: 'Set up time-zone aligned, on-site developer teams in just 2 weeks. Backed by enterprise-ready compliance and guaranteed productivity.',
  }
];

export default function BusinessPage() {
  return (
    <div className="flex flex-col w-full h-full pb-16">
      
      {/* Enterprise Hero */}
      <section className="relative overflow-hidden bg-dark-bg text-white pt-24 pb-20 lg:pt-36 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg/90"></div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-blue-900/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-800/50">
                Enterprise B2B Solutions
              </div>
              <h1 className="heading-lg mb-6 leading-tight">
                Comprehensive <span className="text-primary">Workforce</span> Solutions for Your Business.
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Increase business productivity with our expert talent acquisition services. WorkHustle delivers outcomes, not just headcounts. Let us manage the execution while you focus on growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/business/contact" className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors text-center">
                  Talk to an Expert
                </Link>
                <Link href="#solutions" className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors backdrop-blur-sm text-center">
                  Explore Solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Divider */}
      <section className="bg-primary/5 py-12 border-b border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Enterprises Served', value: '450+' },
                { label: 'Tasks Executed', value: '1.5 Million+' },
                { label: 'Cost Saved', value: '25% Avg' },
                { label: 'Execution Speed', value: '3x Faster' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Deep Dive Solutions Grid */}
      <section id="solutions" className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4 text-gray-900 dark:text-white">Our Tailored Enterprise Services</h2>
          <p className="subtext">From complex field operations to niche technology capabilities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessSolutions.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <sol.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">{sol.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {sol.desc}
              </p>
              <a href="#" className="font-semibold text-primary hover:text-primary-hover flex items-center">
                Learn More <span className="ml-2">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-5xl mx-auto px-4 w-full">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="rounded-3xl bg-gradient-to-r from-primary to-blue-600 p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
         >
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

           <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Don't let execution bottlenecks slow you down.</h2>
           <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">Join 450+ companies who have transformed their operational efficiency with our tech-enabled workforce.</p>
           <Link href="/business/contact" className="relative z-10 inline-block px-10 py-4 rounded-lg bg-white text-primary font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
             Request a Pilot
           </Link>
         </motion.div>
      </section>
      
    </div>
  );
}
