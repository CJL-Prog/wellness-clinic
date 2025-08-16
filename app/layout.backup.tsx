import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { MobileNav } from '@/components/MobileNav';
import Script from 'next/script';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800']
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});

// Update className to include both font variables
<html lang="en" className={`${outfit.variable} ${jakarta.variable}`}></html>