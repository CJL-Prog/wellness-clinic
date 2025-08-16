'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      {
        label: 'Peptide Therapy',
        href: '/services/peptides',
        description: 'Advanced healing protocols',
        icon: '⚡',
      },
      {
        label: 'Hormone Optimization',
        href: '/services/hrt',
        description: 'Bioidentical HRT for men & women',
        icon: '⚖️',
      },
      {
        label: 'Weight Loss',
        href: '/services/weight-loss',
        description: 'Medical weight management',
        icon: '🎯',
      },
      {
        label: 'Lab Testing',
        href: '/services/labs',
        description: 'Comprehensive biomarkers',
        icon: '🔬',
      },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Labs',
    href: '/labs',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav 
        className={`
          fixed w-full z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-white/80 backdrop-blur-sm py-4 shadow-sm'}
        `}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
              aria-label="HealthClinic Home"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 w-11 h-11 bg-primary-500 rounded-xl opacity-0 group-hover:opacity-30 group-hover:animate-ping" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-gray-900 font-heading">
                  Health<span className="gradient-text">Clinic</span>
                </span>
                <span className="hidden sm:block text-xs text-gray-500 font-medium">
                  Personalized Wellness
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={item.href} 
                    className={`
                      font-medium transition-all duration-200 flex items-center gap-1
                      ${isActive(item.href)
                        ? 'text-primary-600 font-semibold' 
                        : 'text-gray-700 hover:text-primary-600'}
                    `}
                  >
                    {item.label}
                    {item.dropdown && (
                      <motion.svg 
                        animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 glass-card p-2 shadow-2xl"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`
                              flex items-start gap-3 p-3 rounded-lg transition-all
                              hover:bg-primary-50 group
                              ${isActive(subItem.href) ? 'bg-primary-50' : ''}
                            `}
                          >
                            <span className="text-2xl mt-0.5">{subItem.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-primary-600">
                                {subItem.label}
                              </div>
                              {subItem.description && (
                                <div className="text-sm text-gray-600">
                                  {subItem.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Desktop CTA Buttons */}
              <div className="flex items-center gap-4 ml-4">
                <Link 
                  href="/portal" 
                  className="font-medium text-gray-700 hover:text-primary-600 transition-colors hidden xl:block"
                >
                  Patient Portal
                </Link>
                <Link 
                  href="/intake" 
                  className="brutal-button-soft"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-6 h-0.5 bg-gray-700 block"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-gray-700 block my-1.5"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-6 h-0.5 bg-gray-700 block"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold font-heading">Menu</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                            className={`
                              w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-all
                              ${isActive(item.href) 
                                ? 'bg-primary-50 text-primary-600' 
                                : 'hover:bg-gray-50 text-gray-700'}
                            `}
                          >
                            {item.label}
                            <motion.svg
                              animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-2 space-y-2">
                                  {item.dropdown.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`
                                        flex items-center gap-3 py-2 px-4 rounded-lg transition-all
                                        ${isActive(subItem.href) 
                                          ? 'bg-primary-50 text-primary-600' 
                                          : 'hover:bg-gray-50 text-gray-600'}
                                      `}
                                    >
                                      <span className="text-xl">{subItem.icon}</span>
                                      <span className="text-sm font-medium">{subItem.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                            block py-3 px-4 rounded-lg font-medium transition-all
                            ${isActive(item.href) 
                              ? 'bg-primary-50 text-primary-600' 
                              : 'hover:bg-gray-50 text-gray-700'}
                          `}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  <hr className="my-4" />
                  
                  {/* Mobile Additional Links */}
                  <Link
                    href="/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg font-medium hover:bg-gray-50 text-gray-700"
                  >
                    Patient Portal
                  </Link>
                  <Link
                    href="/journal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg font-medium hover:bg-gray-50 text-gray-700"
                  >
                    Health Journal
                  </Link>
                </nav>
                
                {/* Mobile CTA Buttons */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/intake"
                    onClick={() => setMobileMenuOpen(false)}
                    className="brutal-button w-full text-center"
                  >
                    Start Assessment
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="brutal-button-secondary w-full text-center"
                  >
                    Sign In
                  </Link>
                </div>
                
                {/* Mobile Contact Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <a href="tel:1-800-XXX-XXXX" className="text-primary-600 font-semibold">
                    1-800-XXX-XXXX
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Mon-Fri 8am-8pm EST</p>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>HSA/FSA Eligible</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under fixed nav */}
      <div className={isScrolled ? 'h-16' : 'h-20'} />
    </>
  );
}