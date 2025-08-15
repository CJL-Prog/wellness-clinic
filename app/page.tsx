import Link from 'next/link';
import { Hero } from '@/components/landing/Hero';
import { ProcessSteps } from '@/components/landing/ProcessSteps';
import { Services } from '@/components/landing/Services';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSteps />
      <Services />
      <Pricing />
      <Testimonials />
      <FAQ />
    </>
  );
}