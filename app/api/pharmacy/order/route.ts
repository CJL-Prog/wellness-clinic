import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// Start with TruePill or Alto Pharmacy API
export async function POST(request: Request) {
  const { patient_id, prescriptions, shipping_address } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  
  // For MVP, you can manually process these
  if (process.env.MANUAL_PHARMACY === 'true') {
    // Send email to your pharmacy contact
    // await resend.emails.send({
    //   from: 'pharmacy@clinic.com',
    //   to: 'pharmacy-team@clinic.com',
    //   subject: `New Rx Order - Patient ${patient_id}`,
    //   html: `
    //     <h2>New Prescription Order</h2>
    //     <h3>Patient: ${patient_id}</h3>
    //     <h3>Ship to:</h3>
    //     <p>${formatAddress(shipping_address)}</p>
    //     <h3>Prescriptions:</h3>
    //     <ul>
    //       ${prescriptions.map((rx: any) => `
    //         <li>
    //           <strong>${rx.drug_name}</strong><br>
    //           Sig: ${rx.sig}<br>
    //           Qty: ${rx.quantity}<br>
    //           Refills: ${rx.refills}
    //         </li>
    //       `).join('')}
    //     </ul>
    //   `
    // });
    
    return NextResponse.json({ success: true, manual: true });
  }
  
  // Real pharmacy API integration
  // const truepill = new TruePillAPI(process.env.TRUEPILL_API_KEY);
  
  // const order = await truepill.orders.create({
  //   patient: {
  //     external_id: patient_id,
  //     address: shipping_address
  //   },
  //   prescriptions: prescriptions.map((rx: any) => ({
  //     medication: {
  //       name: rx.drug_name,
  //       strength: rx.strength,
  //       form: rx.form || 'tablet'
  //     },
  //     quantity: rx.quantity,
  //     refills: rx.refills,
  //     sig: rx.sig,
  //     days_supply: rx.days_supply || 30
  //   })),
  //   shipping: {
  //     method: 'standard',
  //     address: shipping_address
  //   }
  // });
  
  // Save order details
  await supabase.from('pharmacy_orders').insert({
    user_id: patient_id,
    order_id: 'temp_order_id', // order.id,
    status: 'processing',
    tracking_number: null // order.tracking_number
  });
  
  return NextResponse.json({ order_id: 'temp_order_id' });
}

// Helper function for formatting addresses
function formatAddress(address: any) {
  return `${address.line1}${address.line2 ? `, ${address.line2}` : ''}, ${address.city}, ${address.state} ${address.zip}`;
}