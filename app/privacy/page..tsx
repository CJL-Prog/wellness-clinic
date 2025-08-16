export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 gradient-text-hero">Privacy Policy</h1>
        
        <div className="brutal-card bg-white space-y-8">
          <section>
            <p className="text-neutral-600 mb-4">
              Last updated: January 2024
            </p>
            <p className="text-neutral-600">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-neutral-600 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• Personal information (name, email, phone number, date of birth)</li>
              <li>• Medical history and health information</li>
              <li>• Payment and billing information</li>
              <li>• Communications with our support team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-neutral-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• Provide and manage your healthcare services</li>
              <li>• Process payments and billing</li>
              <li>• Communicate with you about your treatment</li>
              <li>• Comply with legal and regulatory requirements</li>
              <li>• Improve our services and develop new features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">HIPAA Compliance</h2>
            <div className="glass-card rounded-lg p-4 mb-4">
              <p className="text-emerald-700">
                <strong>✓ HIPAA Compliant:</strong> We comply with all applicable HIPAA regulations to protect your medical information.
              </p>
            </div>
            <p className="text-neutral-600">
              Your protected health information (PHI) is handled in accordance with HIPAA privacy and security rules. We implement administrative, physical, and technical safeguards to protect your PHI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <p className="text-neutral-600 mb-4">
              We do not sell, rent, or share your personal information with third parties except:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• With your healthcare providers for treatment purposes</li>
              <li>• With pharmacies to fulfill your prescriptions</li>
              <li>• With laboratories for diagnostic testing</li>
              <li>• As required by law or legal process</li>
              <li>• With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-neutral-600">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="space-y-2 text-neutral-600 mt-4">
              <li>• 256-bit SSL encryption for data transmission</li>
              <li>• Secure servers with regular security audits</li>
              <li>• Limited access to personal information</li>
              <li>• Regular employee training on data protection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-neutral-600 mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li>• Access your personal information</li>
              <li>• Request corrections to your information</li>
              <li>• Request deletion of your account</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Request a copy of your medical records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-neutral-600">
              We use cookies and similar tracking technologies to improve your experience on our platform. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-neutral-600">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-neutral-600">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-neutral-600 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="glass-card rounded-lg p-4">
              <p className="font-bold">Privacy Officer:</p>
              <p className="text-neutral-600 mb-3">privacy@clinic.com</p>
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