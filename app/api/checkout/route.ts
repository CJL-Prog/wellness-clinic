import { stripe } from '@/lib/stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// Pricing IDs from Stripe Dashboard
const PRICES = {
  essential: 'price_xxxxx',      // $199/mo × 3 months
  comprehensive: 'price_xxxxx',   // $399/mo × 3 months  
  elite: 'price_xxxxx'           // $599/mo × 3 months
};

export async function POST(request: Request) {
  const { assessmentId, plan = 'comprehensive' } = await request.json();
  const supabase = createRouteHandlerClient();
  
  // Get user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Create or get Stripe customer
  let customerId = user.user_metadata.stripe_customer_id;
  
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabase_uid: user.id
      }
    });
    customerId = customer.id;
    
    // Save for later
    await supabase.auth.updateUser({
      data: { stripe_customer_id: customerId }
    });
  }
  
  // Create checkout session for quarterly subscription
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{
      price: PRICES[plan],
      quantity: 1
    }],
    mode: 'subscription',
    subscription_data: {
      metadata: {
        assessment_id: assessmentId,
        plan_type: plan
      },
      // This enforces the 3-month minimum
      trial_end: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60)
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout?canceled=true`,
    
    // Important for HSA/FSA
    payment_method_options: {
      card: {
        statement_descriptor: 'WELLNESS CLINIC MED'
      }
    }
  });
  
  return Response.json({ url: session.url });
}