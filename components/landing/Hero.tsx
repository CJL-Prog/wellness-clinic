'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-pink-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 brutal-card bg-emerald-100 mb-8"
          >
            <span className="text-sm font-bold text-emerald-800">
              ✨ HSA/FSA Eligible • Licensed Physicians • Discreet Delivery
            </span>
          </motion.div>

          {/* Main Heading */}
         <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Get the <span className="gradient-text">Weight Loss Meds</span>
            <br />
            Your Doctor Won't Prescribe
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Board-certified physicians prescribe Ozempic, Mounjaro & more. 
            <span className="font-bold">No insurance needed.</span> Medication in 48 hours.
            <span className="text-emerald-600 font-bold"> 20% average weight loss.</span>
          </p>

          {/* Add urgency element */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full border-2 border-yellow-300">
              <span className="text-sm font-bold text-yellow-800">
                ⚡ 142 people started today • Limited provider availability
              </span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/intake"
              className="brutal-button group flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
            See If You Qualify
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
  
          <Link 
            href="/pricing"
            className="px-8 py-4 bg-white border-2 border-black rounded-lg font-bold hover:bg-neutral-50 transition-all text-lg"
            style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
          >
            View Pricing ($199/mo)
          </Link>
          </div>

          {/* Add "no credit card" trust text */}
          <p className="text-center text-sm text-neutral-500 -mt-8 mb-12">
            ✓ No credit card required to start • ✓ 2-minute assessment
          </p>
          
          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-neutral-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-neutral-900">Licensed Physicians</div>
                <div className="text-sm">Board-certified providers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-neutral-900">HSA/FSA Eligible</div>
                <div className="text-sm">Use pre-tax dollars</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-neutral-900">Discreet Shipping</div>
                <div className="text-sm">Private & confidential</div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">10,000+</div>
              <div className="text-neutral-600 mt-2">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">4.9/5</div>
              <div className="text-neutral-600 mt-2">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">47</div>
              <div className="text-neutral-600 mt-2">States Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">24hr</div>
              <div className="text-neutral-600 mt-2">Provider Response</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}