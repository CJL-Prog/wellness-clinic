'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyCTA() {
  const [showSticky, setShowSticky] = useState(false);
  const [peopleViewing, setPeopleViewing] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      setShowSticky(window.scrollY > 500);
    };

    // Generate random "people viewing" number
    setPeopleViewing(Math.floor(Math.random() * 50) + 30);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showSticky) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-emerald-500 shadow-2xl p-4 z-40 md:hidden"
      >
        <div className="flex gap-3">
          <Link 
            href="/intake"
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-lg"
            onClick={() => {
              // Track mobile CTA click
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'cta_click', {
                  'cta_text': 'Check If You Qualify',
                  'cta_location': 'sticky_mobile'
                });
              }
            }}
          >
            Check If You Qualify
          </Link>
          <a 
            href="tel:1-800-WELLNESS"
            className="px-6 py-4 bg-white border-2 border-emerald-500 rounded-lg flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
        <div className="flex items-center justify-center mt-2 text-xs text-gray-600">
          <span className="animate-pulse mr-2">🔥</span>
          <span>{peopleViewing} people viewing now • Limited spots today</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}