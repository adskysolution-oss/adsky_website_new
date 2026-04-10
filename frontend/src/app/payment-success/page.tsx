'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { verifyPaymentOrder } from '@/services/payment';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const plan = searchParams.get('plan') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment securely...');
  const [paymentData, setPaymentData] = useState<null | {
    planName: string;
    amount: number;
    orderId: string;
    paymentStatus: string;
    paymentDate: string;
  }>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token || !orderId) {
      router.replace(`/payment-failed?plan=${plan}`);
      return;
    }

    verifyPaymentOrder({ token, orderId })
      .then((data) => {
        setPaymentData(data);
        setStatus('success');
        setMessage('Your subscription has been activated successfully.');
      })
      .catch((error) => {
        const reason = error.response?.data?.message || 'We could not confirm this payment.';
        router.replace(`/payment-failed?plan=${plan}&order_id=${orderId}&reason=${encodeURIComponent(reason)}`);
      });
  }, [orderId, plan, router]);

  return (
    <div className="min-h-screen bg-[#020817] px-4 pt-32 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        {status === 'loading' ? (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#7ca6ff]" />
            <h1 className="mt-6 text-4xl font-black uppercase italic tracking-[-0.05em]">Verifying Payment</h1>
            <p className="mt-4 text-lg text-[#8fa2c2]">{message}</p>
          </>
        ) : (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
            <h1 className="mt-6 text-4xl font-black uppercase italic tracking-[-0.05em]">Payment Successful</h1>
            <p className="mt-4 text-lg text-[#8fa2c2]">{message}</p>

            {paymentData ? (
              <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#071229] p-6 text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7ca6ff]">Plan</p>
                    <p className="mt-2 text-2xl font-black uppercase italic">{paymentData.planName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7ca6ff]">Amount</p>
                    <p className="mt-2 text-2xl font-black tracking-[-0.05em]">₹{paymentData.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7ca6ff]">Order ID</p>
                    <p className="mt-2 break-all text-sm font-semibold text-white/90">{paymentData.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7ca6ff]">Status</p>
                    <p className="mt-2 text-sm font-semibold text-emerald-300">{paymentData.paymentStatus}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/office" className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#041122]">
                Go to Dashboard
              </Link>
              <Link href="/pricing" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white">
                Back to Pricing
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
