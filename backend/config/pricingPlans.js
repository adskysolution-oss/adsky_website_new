const PRICING_PLANS = {
  basic: {
    slug: 'basic',
    name: 'Basic',
    amount: 2999,
    billingLabel: '/month',
  },
  pro: {
    slug: 'pro',
    name: 'Pro',
    amount: 14999,
    billingLabel: '/month',
  },
  enterprise: {
    slug: 'enterprise',
    name: 'Enterprise',
    amount: 49999,
    billingLabel: '/month',
  },
  custom: {
    slug: 'custom',
    name: 'Custom',
    amount: 0,
    billingLabel: 'Quote',
  },
};

const getPlanBySlug = (slug) => PRICING_PLANS[String(slug || '').toLowerCase()] || null;

module.exports = { PRICING_PLANS, getPlanBySlug };
