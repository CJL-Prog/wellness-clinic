export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Shipping Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  Orders are processed within 24-48 hours after physician approval. You will receive a confirmation email with tracking information once your order ships.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Methods</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Standard Shipping (3-5 business days):</strong> Free for all orders
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Express Shipping (1-2 business days):</strong> $25 additional
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <div>
                      <strong>Overnight Shipping:</strong> $45 additional
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Temperature-Controlled Shipping</h3>
                <p className="text-gray-600">
                  Medications requiring refrigeration are shipped in temperature-controlled packaging with ice packs. These shipments are sent via overnight or 2-day shipping to maintain product integrity.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Discreet Packaging</h3>
                <p className="text-gray-600">
                  All orders are shipped in plain, unmarked packaging for your privacy. The return address will show our fulfillment center name without any indication of the contents.
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Signature Requirements</h3>
                <p className="text-gray-600">
                  Some medications may require an adult signature upon delivery. You will be notified if this applies to your order.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
                <p className="text-gray-600">
                  We can ship to residential and commercial addresses. We cannot ship to P.O. boxes for medications requiring signature or temperature control.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Tracking Your Order</h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive an email with tracking information. You can also track your order through your patient portal.
                </p>
              </div>
            </div>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Returns & Refunds</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> Due to federal regulations, medications cannot be returned once they leave our pharmacy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Damaged or Incorrect Orders</h3>
                <p className="text-gray-600">
                  If you receive damaged or incorrect medications, please contact us immediately at support@clinic.com or 1-800-XXX-XXXX. We will arrange for a replacement at no cost to you.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Refund Policy</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Refunds are only available if treatment is denied by our medical team</li>
                  <li>• Subscription cancellations take effect at the end of the current billing period</li>
                  <li>• Lab test orders cannot be refunded once processed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Lost or Stolen Packages</h3>
                <p className="text-gray-600">
                  If your tracking shows delivered but you haven't received your package, please check with neighbors and your building manager. If still not found, contact us and we'll work with the carrier to investigate.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Restrictions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">State Restrictions</h3>
                <p className="text-gray-600 mb-2">
                  We currently ship to 47 states. We are working to expand our services nationwide.
                </p>
                <p className="text-gray-600">
                  States we currently <strong>cannot</strong> ship to:
                </p>
                <ul className="mt-2 text-gray-600">
                  <li>• Alaska</li>
                  <li>• Hawaii</li>
                  <li>• New York (coming soon)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">International Shipping</h3>
                <p className="text-gray-600">
                  We do not currently offer international shipping. All orders must be shipped to a valid U.S. address.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Our support team is available to help with any shipping questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:support@clinic.com" 
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50"
              >
                Email Support
              </a>
              <a 
                href="tel:1-800-XXX-XXXX" 
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Call 1-800-XXX-XXXX
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}