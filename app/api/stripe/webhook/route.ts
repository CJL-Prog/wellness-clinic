import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      
      // 1. Get the assessment that was just paid for
      const assessmentId = session.metadata?.assessment_id;
      const subscriptionId = session.subscription;
      
      // 2. Update assessment to paid
      await supabase
        .from('assessments')
        .update({ 
          status: 'paid_awaiting_review',
          stripe_subscription_id: subscriptionId 
        })
        .eq('id', assessmentId);
      
      // 3. Create subscription record
      await supabase
        .from('subscriptions')
        .insert({
          user_id: session.metadata?.user_id,
          stripe_subscription_id: subscriptionId,
          stripe_customer_id: session.customer,
          plan_type: session.metadata?.plan_type,
          status: 'active'
        });
      
      // 4. Send confirmation email
      await resend.emails.send({
        from: 'clinic@yourdomain.com',
        to: session.customer_email!,
        subject: 'Welcome! Your provider will review within 24 hours',
        html: `
          <h2>Your health journey starts now!</h2>
          <p>We've received your assessment and payment.</p>
          <p><strong>Next steps:</strong></p>
          <ol>
            <li>Provider reviews your assessment (24-48 hours)</li>
            <li>If approved, medications ship immediately</li>
            <li>You'll receive tracking information via email</li>
          </ol>
          <p>Questions? Reply to this email.</p>
        `
      });
      
      // 5. Notify provider via Slack/Discord (optional but useful)
      await notifyProviders(assessmentId);
      
      break;
    }
    
    case 'invoice.payment_failed': {
      // Handle failed recurring payments
      const invoice = event.data.object;
      
      await supabase
        .from('subscriptions')
        .update({ status: 'past_due' })
        .eq('stripe_subscription_id', invoice.subscription);
        
      // Email user about failed payment
      await resend.emails.send({
        from: 'billing@yourdomain.com',
        to: invoice.customer_email!,
        subject: 'Payment failed - Action required',
        html: `Update your payment method to continue treatment...`
      });
      
      break;
    }
    
    case 'customer.subscription.deleted': {
      // Handle cancellations
      const subscription = event.data.object;
      
      await supabase
        .from('subscriptions')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscription.id);
        
      break;
    }
  }
  
  return new Response('Success', { status: 200 });
}

// Helper to notify providers
async function notifyProviders(assessmentId: string) {
  // Use Discord webhook for instant notifications
  await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `🚨 New assessment needs review!\nID: ${assessmentId}\nReview at: ${process.env.NEXT_PUBLIC_URL}/provider/review/${assessmentId}`
    })
  });
}