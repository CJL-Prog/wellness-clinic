'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get('assessment');
  const canceled = searchParams.get('canceled');

  if (canceled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
        <div className="max-w-md mx-auto px-6">
          <div className="brutal-card p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
            <p className="text-gray-600 mb-6">
              Your payment was canceled. Don't worry, your assessment has been saved and you can complete checkout anytime.
            </p>
            <Link
              href="/intake"
              className="inline-block brutal-button"
            >
              Return to Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2 brutal-card p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Comprehensive Membership</span>
                <span>$399/month</span>
              </div>
              <p className="text-sm text-gray-600">Billed quarterly ($1,197 every 3 months)</p>
            </div>
            
            <div className="space-y-2 mb-4">
              <h3 className="font-medium">What's Included:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Physician consultation & ongoing care</li>
                <li>✓ Personalized treatment plan</li>
                <li>✓ Medications shipped monthly</li>
                <li>✓ Regular provider check-ins</li>
                <li>✓ Lab testing (when required)</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-500">
              <p className="text-sm text-emerald-800">
                <strong>Note:</strong> After physician review, if your treatment is not approved, you will receive a full refund.
              </p>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="brutal-card p-6">
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            
            <div className="mb-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Due Today:</span>
                <span>$1,197</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">First 3 months</p>
            </div>
            
            <button
              onClick={() => {
                alert('Stripe checkout would open here');
              }}
              className="w-full brutal-button mb-3"
            >
              Pay with Card
            </button>
            
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">or pay with</p>
              <button className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                HSA/FSA Card
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}