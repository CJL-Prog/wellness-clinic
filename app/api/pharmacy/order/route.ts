// Start with TruePill or Alto Pharmacy API
export async function POST(request: Request) {
  const { patient_id, prescriptions, shipping_address } = await request.json();
  
  // For MVP, you can manually process these
  if (process.env.MANUAL_PHARMACY === 'true') {
    // Send email to your pharmacy contact
    await resend.emails.send({
      from: 'pharmacy@clinic.com',
      to: 'pharmacy-team@clinic.com',
      subject: `New Rx Order - Patient ${patient_id}`,
      html: `
        <h2>New Prescription Order</h2>
        <h3>Patient: ${patient_id}</h3>
        <h3>Ship to:</h3>
        <p>${formatAddress(shipping_address)}</p>
        <h3>Prescriptions:</h3>
        <ul>
          ${prescriptions.map(rx => `
            <li>
              <strong>${rx.drug_name}</strong><br>
              Sig: ${rx.sig}<br>
              Qty: ${rx.quantity}<br>
              Refills: ${rx.refills}
            </li>
          `).join('')}
        </ul>
      `
    });
    
    return Response.json({ success: true, manual: true });
  }
  
  // Real pharmacy API integration
  const truepill = new TruePillAPI(process.env.TRUEPILL_API_KEY);
  
  const order = await truepill.orders.create({
    patient: {
      external_id: patient_id,
      address: shipping_address
    },
    prescriptions: prescriptions.map(rx => ({
      medication: {
        name: rx.drug_name,
        strength: rx.strength,
        form: rx.form || 'tablet'
      },
      quantity: rx.quantity,
      refills: rx.refills,
      sig: rx.sig,
      days_supply: rx.days_supply || 30
    })),
    shipping: {
      method: 'standard',
      address: shipping_address
    }
  });
  
  // Save order details
  await supabase.from('pharmacy_orders').insert({
    user_id: patient_id,
    order_id: order.id,
    status: 'processing',
    tracking_number: order.tracking_number
  });
  
  return Response.json({ order_id: order.id });
}