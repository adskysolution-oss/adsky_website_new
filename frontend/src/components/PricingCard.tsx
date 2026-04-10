import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PricingPlan } from '@/lib/pricing';

type PricingCardProps = {
  plan: PricingPlan;
};

export default function PricingCard({ plan }: PricingCardProps) {
  const Icon = plan.icon;

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6 transition-all duration-300 ${
      plan.recommended
        ? 'border-white/40 bg-[linear-gradient(180deg,rgba(8,20,43,0.98),rgba(3,9,24,0.98))] shadow-[0_24px_70px_rgba(0,0,0,0.26)]'
        : 'border-white/10 bg-[linear-gradient(180deg,rgba(5,12,28,0.96),rgba(3,9,24,0.98))] shadow-[0_18px_48px_rgba(0,0,0,0.18)]'
    }`}>
      {plan.slug === 'standard' && (
        <div className="pointer-events-none absolute -left-20 -top-32 h-72 w-72 rounded-full bg-[#102d68]/70 blur-sm" />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.04] text-[#4d8fff] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Icon className="h-6 w-6" />
          </div>
          {plan.recommended && (
            <span className="rounded-full bg-[#245dff] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
              Recommended
            </span>
          )}
        </div>

        <h3 className="text-[2.1rem] font-extrabold uppercase italic tracking-[-0.05em] text-white">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm font-medium italic text-[#7a8fb7]">{plan.tagLine}</p>

        <div className="mt-8 flex items-end gap-2">
          <div className="text-5xl font-black tracking-[-0.07em] text-white md:text-6xl">{plan.priceLabel}</div>
          {plan.monthlyLabel ? (
            <div className="pb-2 text-sm font-semibold text-[#6f8bb7]">{plan.monthlyLabel}</div>
          ) : null}
        </div>

        <div className="mt-8 space-y-4">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 text-white">
              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-[#2d7dff]" />
              <span className="text-[0.96rem] font-semibold italic leading-6 text-white/88">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/pricing/${plan.slug}`}
          className={`mt-10 flex w-full items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
            plan.recommended
              ? 'border-white bg-white text-[#020919] hover:bg-[#eef3ff]'
              : 'border-white/12 bg-white/6 text-white hover:bg-white/12'
          }`}
        >
          {plan.ctaLabel}
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      </div>
    </div>
  );
}
