'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/services',
    label: 'Services',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: '/intake',
    label: 'Start',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    isPrimary: true,
  },
  {
    href: '/portal',
    label: 'Portal',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: '#menu',
    label: 'Menu',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    isMenu: true,
  },
];

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 glass border-t-2 border-black md:hidden z-40"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            if (item.isMenu) {
              return (
                <button
                  key={item.label}
                  onClick={() => setIsMenuOpen(true)}
                  className="flex flex-col items-center py-2 px-1"
                >
                  <span className="text-neutral-600">{item.icon}</span>
                  <span className="text-xs mt-1 text-neutral-600">{item.label}</span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 transition-colors ${
                  item.isPrimary
                    ? 'text-emerald-600'
                    : isActive
                    ? 'text-emerald-600'
                    : 'text-neutral-600'
                }`}
              >
                {item.isPrimary ? (
                  <div className="bg-emerald-500 rounded-full p-2 text-white">
                    {item.icon}
                  </div>
                ) : (
                  <span>{item.icon}</span>
                )}
                <span className={`text-xs mt-1 ${item.isPrimary ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 glass-card z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold gradient-text">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="space-y-2">
                  <Link
                    href="/services"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50 font-bold text-neutral-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Services
                  </Link>
                  <Link
                    href="/services/peptides"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Peptide Therapy
                  </Link>
                  <Link
                    href="/services/hrt"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hormone Replacement
                  </Link>
                  <Link
                    href="/services/weight-loss"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Weight Loss
                  </Link>
                  <Link
                    href="/labs"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lab Testing
                  </Link>
                  
                  <hr className="my-4 border-black" />
                  
                  <Link
                    href="/how-it-works"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link
                    href="/pricing"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/faq"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  
                  <hr className="my-4 border-black" />
                  
                  <Link
                    href="/portal"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Patient Portal
                  </Link>
                  <Link
                    href="/journal"
                    className="block py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Health Journal
                  </Link>
                </nav>
                
                <div className="mt-8">
                  <Link
                    href="/intake"
                    className="brutal-button w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start Assessment
                  </Link>
                </div>
                
                <div className="mt-8 text-center text-sm text-neutral-500">
                  <p className="font-bold">Support: 1-800-XXX-XXXX</p>
                  <p>Mon-Fri 8am-8pm EST</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}