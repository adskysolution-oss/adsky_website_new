import axios from 'axios';
import { API_BASE_URL } from '@/lib/auth';
import type { PlanSlug } from '@/lib/pricing';

declare global {
  interface Window {
    Cashfree?: (options: { mode: 'sandbox' | 'production' }) => {
      checkout: (options: { paymentSessionId: string; redirectTarget?: '_self' | '_blank' | '_top' | '_modal' }) => Promise<unknown> | void;
    };
  }
}

const PAYMENT_API_URL = `${API_BASE_URL}/payment`;
const CASHFREE_SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';

export const createPaymentOrder = async ({
  token,
  planSlug,
  amount,
}: {
  token: string;
  planSlug: PlanSlug;
  amount: number;
}) => {
  const response = await axios.post(
    `${PAYMENT_API_URL}/create-order`,
    { planSlug, amount },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data as {
    orderId: string;
    planName: string;
    amount: number;
    payment_session_id: string;
  };
};

export const verifyPaymentOrder = async ({
  token,
  orderId,
}: {
  token: string;
  orderId: string;
}) => {
  const response = await axios.post(
    `${PAYMENT_API_URL}/verify`,
    { orderId },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data as {
    success: boolean;
    planName: string;
    amount: number;
    orderId: string;
    paymentStatus: string;
    paymentDate: string;
  };
};

export const submitCustomQuote = async ({
  token,
  name,
  email,
  requirements,
}: {
  token: string;
  name: string;
  email: string;
  requirements: string;
}) => {
  const response = await axios.post(
    `${PAYMENT_API_URL}/custom-quote`,
    { name, email, requirements },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data as { success: boolean; message: string };
};

export const loadCashfreeSdk = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Cashfree checkout is only available in the browser.');
  }

  if (window.Cashfree) {
    return window.Cashfree;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${CASHFREE_SDK_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Cashfree SDK.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = CASHFREE_SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load Cashfree SDK.'));
    document.body.appendChild(script);
  });

  if (!window.Cashfree) {
    throw new Error('Cashfree SDK failed to initialize.');
  }

  return window.Cashfree;
};

export const openCashfreeCheckout = async (paymentSessionId: string) => {
  const cashfreeFactory = await loadCashfreeSdk();
  const cashfree = cashfreeFactory({
    mode: (process.env.NEXT_PUBLIC_CASHFREE_MODE as 'sandbox' | 'production') || 'sandbox',
  });

  return cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_self',
  });
};
