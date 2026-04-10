'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getPlanBySlug } from '@/lib/pricing';
import { createPaymentOrder, openCashfreeCheckout, submitCustomQuote } from '@/services/payment';

export default function PricingPlanPage() {
  const params = useParams<{ plan: string }>();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const plan = useMemo(() => getPlanBySlug(params?.plan), [params]);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    requirements: '',
  });

  useEffect(() => {
    if (user) {
      setQuoteForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handlePurchase = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    if (!plan || plan.slug === 'custom') {
      return;
    }

    setActionError('');
    setIsSubmitting(true);

    try {
      const order = await createPaymentOrder({
        token,
        planSlug: plan.slug,
        amount: plan.amount,
      });
      await openCashfreeCheckout(order.payment_session_id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Unable to start payment. Please try again.';
      setActionError(message);
      router.push(`/payment-failed?plan=${plan.slug}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    setActionError('');
    setActionSuccess('');
    setIsSubmitting(true);

    try {
      const response = await submitCustomQuote({
        token,
        ...quoteForm,
      });
      setActionSuccess(response.message);
      setQuoteForm((prev) => ({ ...prev, requirements: '' }));
    } catch (error: any) {
      setActionError(error.response?.data?.message || 'Unable to submit your quote request right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(26,73,160,0.18),transparent_22%),linear-gradient(180deg,#03101f_0%,#020817_58%,#041122_100%)] px-4 pt-28 text-white">
        <div className="mx-auto max-w-4xl rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-4xl font-black uppercase italic">Plan not found</h1>
          <Link href="/pricing" className="mt-6 inline-flex rounded-full border border-white/20 px-6 py-3 font-bold uppercase tracking-[0.16em] text-white">
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(26,73,160,0.18),transparent_22%),linear-gradient(180deg,#03101f_0%,#020817_58%,#041122_100%)] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Pricing
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 text-[#7ca6ff]">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-[0.22em]">Secure Pricing Flow</span>
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase italic tracking-[-0.05em] md:text-5xl">{plan.name}</h1>
            <p className="mt-2 text-base font-medium italic text-[#7b90b8]">{plan.tagLine}</p>

            <div className="mt-8 flex items-end gap-2">
              <div className="text-5xl font-black tracking-[-0.08em] md:text-6xl">{plan.priceLabel}</div>
              {plan.monthlyLabel ? <div className="pb-2 text-sm font-semibold text-[#7b90b8]">{plan.monthlyLabel}</div> : null}
            </div>

            <div className="mt-7 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3.5 text-[0.98rem] font-semibold italic text-white/90">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#071229] p-7 shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
            <h2 className="text-2xl font-black uppercase italic tracking-[-0.04em] md:text-3xl">
              {plan.slug === 'custom' ? 'Request Your Quote' : 'Complete Your Purchase'}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#95a7c6] md:text-base">
              {plan.slug === 'custom'
                ? 'Tell us about your requirements and our team will tailor a custom proposal for your business.'
                : 'This purchase is protected by JWT-authenticated order creation and backend-side Cashfree verification.'}
            </p>

            {!isLoading && !user ? (
              <div className="mt-8 rounded-[1.5rem] border border-[#24457f] bg-[#0a1932] p-6">
                <p className="text-base leading-7 text-[#c5d5f5]">Please sign in before continuing with pricing and payment.</p>
                <Link href="/login" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#041122]">
                  Sign In
                </Link>
              </div>
            ) : plan.slug === 'custom' ? (
              <form className="mt-8 space-y-5" onSubmit={handleQuoteSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Name</label>
                  <input
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#4e83ff]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Email</label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#4e83ff]"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-white/70">Requirements</label>
                  <textarea
                    value={quoteForm.requirements}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, requirements: e.target.value }))}
                    className="min-h-40 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#4e83ff]"
                    placeholder="Describe architecture scope, talent requirements, timelines, and security needs."
                  />
                </div>
                {actionError ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{actionError}</p> : null}
                {actionSuccess ? <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{actionSuccess}</p> : null}
                <button disabled={isSubmitting} className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#041122] disabled:opacity-60">
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </form>
            ) : (
              <div className="mt-8">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7ca6ff]">Selected Plan</p>
                      <h3 className="mt-2 text-2xl font-black uppercase italic">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black tracking-[-0.06em]">{plan.priceLabel}</div>
                      <div className="text-sm font-semibold text-[#7b90b8]">{plan.monthlyLabel}</div>
                    </div>
                  </div>
                </div>

                {actionError ? <p className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{actionError}</p> : null}

                <button
                  onClick={handlePurchase}
                  disabled={isSubmitting || isLoading}
                  className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-[#041122] disabled:opacity-60"
                >
                  {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : 'Pay with Cashfree'}
                </button>

                <p className="mt-4 text-sm leading-7 text-[#7b90b8]">
                  Payment completion is never trusted on the client alone. Your subscription is activated only after backend verification confirms a successful Cashfree order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
