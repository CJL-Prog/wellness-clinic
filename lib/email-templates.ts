export const emailTemplates = {
  // After payment
  welcomeEmail: (name: string) => ({
    subject: 'Welcome! Your provider will review within 24 hours',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">Welcome to [Clinic Name], ${name}!</h1>
        
        <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2>What happens next?</h2>
          <ol>
            <li>✅ <strong>Within 24 hours:</strong> Provider reviews your assessment</li>
            <li>📦 <strong>If approved:</strong> Medications ship same day</li>
            <li>📱 <strong>Within 48 hours:</strong> Tracking information sent</li>
            <li>🔬 <strong>Week 1:</strong> Optional lab work scheduling</li>
          </ol>
        </div>
        
        <p>Access your patient portal anytime: <a href="${process.env.NEXT_PUBLIC_URL}/portal">Login Here</a></p>
        
        <p style="color: #6C757D; font-size: 14px;">
          Questions? Reply to this email or call 1-800-XXX-XXXX
        </p>
      </div>
    `
  }),
  
  // After approval
  approvalEmail: (name: string, medications: any[], tracking?: string) => ({
    subject: '✅ Treatment Approved - Shipment on the way!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #28A745;">Great news, ${name}!</h1>
        
        <p>Your provider has approved your treatment plan.</p>
        
        <div style="background: #E8F2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Medications:</h3>
          <ul>
            ${medications.map(med => `
              <li>
                <strong>${med.name}</strong><br>
                Instructions: ${med.instructions}
              </li>
            `).join('')}
          </ul>
        </div>
        
        ${tracking ? `
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px;">
            <h3>📦 Track Your Shipment</h3>
            <p>Tracking #: <strong>${tracking}</strong></p>
            <p>Expected delivery: 2-3 business days</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding: 20px; border: 2px solid #FFD700; border-radius: 8px;">
          <h3>📅 Schedule Your Follow-up</h3>
          <p>Book your 2-week check-in call:</p>
          <a href="${process.env.NEXT_PUBLIC_URL}/portal/appointments" 
             style="display: inline-block; background: #4A90E2; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
            Schedule Now
          </a>
        </div>
      </div>
    `
  }),
  
  // Failed payment
  paymentFailedEmail: (name: string) => ({
    subject: '⚠️ Payment Failed - Action Required',
    html: `...`
  })
};