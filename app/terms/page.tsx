export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 gradient-text-hero">Terms of Service</h1>
        
        <div className="brutal-card bg-white space-y-8">
          <section>
            <p className="text-neutral-600 mb-4">
              Last updated: January 2024
            </p>
            <p className="text-neutral-600">
              Please read these Terms of Service carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-neutral-600">
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Medical Services</h2>
            <p className="text-neutral-600 mb-4">
              Our platform provides telemedicine services through licensed healthcare providers. These services are not intended to replace emergency medical care.
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• Services are only available to patients 18 years or older</li>
              <li>• You must provide accurate and complete medical information</li>
              <li>• Treatment is subject to physician approval</li>
              <li>• Not all conditions can be treated via telemedicine</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Subscription Terms</h2>
            <p className="text-neutral-600 mb-4">
              Our services operate on a subscription basis with the following terms:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• Minimum 3-month commitment required</li>
              <li>• Billing occurs monthly or quarterly</li>
              <li>• Automatic renewal unless cancelled</li>
              <li>• Cancellation takes effect at the end of the current billing period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Privacy & Data Protection</h2>
            <p className="text-neutral-600">
              We are committed to protecting your privacy and comply with HIPAA regulations. Your medical information is confidential and will only be shared with your healthcare providers and as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Prohibited Uses</h2>
            <p className="text-neutral-600 mb-4">
              You may not use our services:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• To obtain medications for illegal purposes</li>
              <li>• To share or resell prescribed medications</li>
              <li>• To provide false medical information</li>
              <li>• To violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Disclaimers</h2>
            <div className="bg-yellow-50 border-2 border-black rounded-lg p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Medical Disclaimer:</strong> Our services are not for emergency medical conditions. If you are experiencing a medical emergency, call 911 immediately.
              </p>
            </div>
            <p className="text-neutral-600">
              Results may vary. We do not guarantee specific outcomes from treatment. All medications carry potential risks and side effects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-neutral-600">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p className="text-neutral-600 mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="glass-card rounded-lg p-4">
              <p className="font-bold">Email:</p>
              <p className="text-neutral-600 mb-3">legal@clinic.com</p>
              <p className="font-bold">Phone:</p>
              <p className="text-neutral-600 mb-3">1-800-XXX-XXXX</p>
              <p className="font-bold">Address:</p>
              <p className="text-neutral-600">[Clinic Address]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}