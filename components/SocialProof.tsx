'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  { name: 'Sarah from Texas', action: 'just started her weight loss journey' },
  { name: 'Michael from Florida', action: 'lost 15 lbs in his first month' },
  { name: 'Jennifer from California', action: 'qualified for Ozempic treatment' },
  { name: 'David from New York', action: 'received his medication today' },
  { name: 'Lisa from Arizona', action: 'booked her consultation' },
];

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Change from 3 seconds to 10 seconds for first appearance
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // ← Changed from 3000 to 10000 (10 seconds)

    // Change rotation interval from 5 seconds to 15 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 15000); // ← Changed from 5000 to 15000 (15 seconds)

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-20 left-4 bg-white rounded-lg shadow-2xl p-4 z-30 max-w-sm border-l-4 border-emerald-500"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {notifications[currentIndex].name}
              </p>
              <p className="text-sm text-gray-600">
                {notifications[currentIndex].action}
              </p>
              <p className="text-xs text-gray-400 mt-1">Just now</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}