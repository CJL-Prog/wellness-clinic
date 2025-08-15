export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">[Clinic Name]</h3>
            <p className="text-gray-400 text-sm">
              Personalized health solutions delivered to you. All treatments require medical consultation 
              and are only provided if clinically appropriate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/portal" className="hover:text-white transition-colors">Patient Portal</a></li>
              <li><a href="/intake" className="hover:text-white transition-colors">Schedule Consultation</a></li>
              <li><a href="/labs" className="hover:text-white transition-colors">Lab Results</a></li>
              <li><a href="/journal" className="hover:text-white transition-colors">Health Journal</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@[clinic].com</li>
              <li>1-800-XXX-XXXX</li>
              <li>Mon-Fri 8am-8pm EST</li>
              <li>Sat-Sun 9am-5pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 [Clinic Name]. All rights reserved. | HSA/FSA Eligible | HIPAA Compliant</p>
        </div>
      </div>
    </footer>
  );
}