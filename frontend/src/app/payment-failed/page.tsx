'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'pricing';
  const reason = searchParams.get('reason') || 'The payment was cancelled or could not be verified.';
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-[#020817] px-4 pt-32 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <AlertTriangle className="mx-auto h-14 w-14 text-[#ff7f7f]" />
        <h1 className="mt-6 text-4xl font-black uppercase italic tracking-[-0.05em]">Payment Failed</h1>
        <p className="mt-4 text-lg text-[#8fa2c2]">{reason}</p>

        {orderId ? (
          <p className="mt-6 text-sm font-semibold text-white/70">
            Order reference: <span className="break-all text-white">{orderId}</span>
          </p>
        ) : null}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={`/pricing/${plan}`} className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#041122]">
            Try Again
          </Link>
          <Link href="/pricing" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white">
            Back to Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
