import PricingCard from '@/components/PricingCard';
import { pricingPlans } from '@/lib/pricing';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(26,73,160,0.18),transparent_22%),linear-gradient(180deg,#03101f_0%,#020817_58%,#041122_100%)] px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="eyebrow mb-5">Pricing</p>
          <h1 className="text-4xl font-black uppercase italic tracking-[-0.06em] text-white md:text-6xl">
            Choose the operating model that fits your scale.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#93a6c8] md:text-lg">
            Secure Cashfree payments for subscription plans, protected verification on the backend, and a quote-request workflow for bespoke engagements.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
