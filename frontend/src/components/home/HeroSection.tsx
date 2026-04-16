'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const orbitingRoles = [
  { name: 'Data Annotation', angle: -90, distance: 250, ring: 'bg-violet-500', image: 'photo-1494790108377-be9c29b29330' },
  { name: 'Quality Analysts', angle: -35, distance: 255, ring: 'bg-emerald-400', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Recruiters', angle: 18, distance: 250, ring: 'bg-sky-400', image: 'photo-1573497019940-1c28c88b4f3e' },
  { name: 'Telesales', angle: 70, distance: 245, ring: 'bg-cyan-400', image: 'photo-1438761681033-6461ffad8d80' },
  { name: 'Designers', angle: 120, distance: 248, ring: 'bg-pink-500', image: 'photo-1580489944761-15a19d654956' },
  { name: 'Telecallers', angle: 170, distance: 242, ring: 'bg-orange-400', image: 'photo-1472099645785-5658abf4ff4e' },
  { name: 'Field Ops', angle: 220, distance: 245, ring: 'bg-amber-400', image: 'photo-1500648767791-00dcc994a43e' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#102949_0%,#18395f_48%,#0d2137_100%)] pt-28 text-white lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(70,125,255,0.22),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(150,90,255,0.12),transparent_22%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-white/65">AD Sky Solution</p>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Work-as-a-Service Platform!
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            Full-time, part-time, gigs, quality assurance, and work applications built into one clear workforce journey.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-grey px-8 py-4 text-base font-semibold !text-black  shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)]"
            >
              Get Started Free
            </Link>
            <Link
              href="/business"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Explore Solutions
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-14 flex h-[640px] w-full max-w-6xl items-center justify-center overflow-hidden sm:h-[700px]">
          <div className="absolute inset-0 hidden lg:block">
            {orbitingRoles.map((role, index) => {
              const radians = (role.angle * Math.PI) / 180;
              const x = Math.cos(radians) * role.distance;
              const y = Math.sin(radians) * role.distance;

              return (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  transition={{ duration: 0.75, delay: 0.9 + index * 0.12, type: 'spring', stiffness: 110, damping: 16 }}
                  className="absolute left-1/2 top-1/2"
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute left-1/2 top-1/2 -z-10 h-px w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[var(--angle)] border-t border-dashed border-white/25" style={{ ['--angle' as string]: `${role.angle}deg` }} />
                    <div className={`h-26 w-26 overflow-hidden rounded-full border-4 border-white shadow-2xl ${role.ring}`}>
                      <Image
                        src="/hero.webp"
                        alt={role.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/30 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      {role.name}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="relative z-10"
          >
            <div className="absolute inset-x-12 bottom-0 h-12 rounded-full bg-black/35 blur-2xl" />
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=640"
              alt="Professional worker"
              width={330}
              height={470}
              className="relative h-[360px] w-[260px] object-cover object-top sm:h-[430px] sm:w-[300px] lg:h-[470px] lg:w-[330px]"
              style={{ clipPath: 'polygon(50% 0%, 100% 24%, 100% 100%, 0% 100%, 0% 24%)', filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.45))' }}
              unoptimized
            />
          </motion.div>

          <div className="mt-10 grid w-full max-w-xl gap-3 lg:hidden">
            {orbitingRoles.slice(0, 4).map((role) => (
              <div key={role.name} className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm">
                <div className={`h-10 w-10 overflow-hidden rounded-full border-2 border-white ${role.ring}`}>
                  <Image
                    src={`https://images.unsplash.com/${role.image}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=120`}
                    alt={role.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-medium text-white/88">{role.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
