import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 border-t-4 border-emerald-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">[Clinic Name]</h3>
            <p className="text-neutral-400 text-sm">
              Personalized health solutions delivered to you. All treatments require medical consultation 
              and are only provided if clinically appropriate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/portal" className="hover:text-emerald-400 transition-colors">Patient Portal</Link></li>
              <li><Link href="/intake" className="hover:text-emerald-400 transition-colors">Schedule Consultation</Link></li>
              <li><Link href="/labs" className="hover:text-emerald-400 transition-colors">Lab Testing</Link></li>
              <li><Link href="/journal" className="hover:text-emerald-400 transition-colors">Health Journal</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Support</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="mailto:support@clinic.com" className="hover:text-emerald-400 transition-colors">
                  support@clinic.com
                </a>
              </li>
              <li>
                <a href="tel:1-800-XXX-XXXX" className="hover:text-emerald-400 transition-colors">
                  1-800-XXX-XXXX
                </a>
              </li>
              <li>Mon-Fri 8am-8pm EST</li>
              <li>Sat-Sun 9am-5pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>© 2024 [Clinic Name]. All rights reserved. | <span className="text-emerald-400">HSA/FSA Eligible</span> | <span className="text-emerald-400">HIPAA Compliant</span></p>
        </div>
      </div>
    </footer>
  );
}