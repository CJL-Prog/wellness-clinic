'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function WelcomeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="brutal-card p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Health Journey!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your payment was successful and your assessment is being reviewed.
          </p>
          
          {/* What Happens Next */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border-2 border-black">
            <h2 className="font-bold mb-4">What happens next?</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">1.</span>
                <div>
                  <p className="font-medium">Provider Review (24-48 hours)</p>
                  <p className="text-sm text-gray-600">A licensed physician will review your assessment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">2.</span>
                <div>
                  <p className="font-medium">Treatment Plan Created</p>
                  <p className="text-sm text-gray-600">Your personalized protocol will be prepared</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">3.</span>
                <div>
                  <p className="font-medium">Medications Shipped</p>
                  <p className="text-sm text-gray-600">Delivered discreetly to your door in 3-5 days</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/portal"
              className="block w-full brutal-button"
            >
              Go to Patient Portal
            </Link>
            <Link
              href="/"
              className="block w-full py-3 bg-white border-2 border-black rounded-lg font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Return to Home
            </Link>
          </div>
          
          {/* Support Info */}
          <div className="mt-8 pt-8 border-t-2 border-black">
            <p className="text-sm text-gray-600 mb-2">Need help? We're here for you.</p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="mailto:support@clinic.com" className="text-emerald-600 hover:underline font-bold">
                support@clinic.com
              </a>
              <span className="text-gray-400">|</span>
              <a href="tel:1-800-XXX-XXXX" className="text-emerald-600 hover:underline font-bold">
                1-800-XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="brutal-card p-8">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}