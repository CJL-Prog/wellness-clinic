'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed w-full z-50 transition-all duration-300
      ${isScrolled 
        ? 'glass-dark py-4' 
        : 'glass py-6'}
    `}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center brutal-shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold gradient-text-hero">HealthClinic</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/services" 
              className={`font-medium transition-colors ${
                pathname === '/services' || pathname?.startsWith('/services/')
                  ? 'gradient-text' 
                  : 'text-neutral-700 hover:text-emerald-600'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/labs" 
              className={`font-medium transition-colors ${
                pathname === '/labs' 
                  ? 'gradient-text' 
                  : 'text-neutral-700 hover:text-emerald-600'
              }`}
            >
              Lab Testing
            </Link>
            <Link 
              href="/how-it-works" 
              className={`font-medium transition-colors ${
                pathname === '/how-it-works' 
                  ? 'gradient-text' 
                  : 'text-neutral-700 hover:text-emerald-600'
              }`}
            >
              How It Works
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium transition-colors ${
                pathname === '/pricing' 
                  ? 'gradient-text' 
                  : 'text-neutral-700 hover:text-emerald-600'
              }`}
            >
              Pricing
            </Link>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/signin" 
                className="font-medium text-neutral-700 hover:text-emerald-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/intake" 
                className="brutal-button"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/services" 
                className="font-medium text-neutral-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/labs" 
                className="font-medium text-neutral-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Lab Testing
              </Link>
              <Link 
                href="/how-it-works" 
                className="font-medium text-neutral-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/pricing" 
                className="font-medium text-neutral-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/signin" 
                className="font-medium text-neutral-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/intake"
                className="brutal-button text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}