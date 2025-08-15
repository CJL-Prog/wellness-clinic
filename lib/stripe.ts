import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Price IDs from your Stripe Dashboard
export const PRICE_IDS = {
  essential_monthly: process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY!,
  essential_quarterly: process.env.STRIPE_PRICE_ESSENTIAL_QUARTERLY!,
  comprehensive_monthly: process.env.STRIPE_PRICE_COMPREHENSIVE_MONTHLY!,
  comprehensive_quarterly: process.env.STRIPE_PRICE_COMPREHENSIVE_QUARTERLY!,
  elite_monthly: process.env.STRIPE_PRICE_ELITE_MONTHLY!,
  elite_quarterly: process.env.STRIPE_PRICE_ELITE_QUARTERLY!,
};

// Helper to format prices
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}