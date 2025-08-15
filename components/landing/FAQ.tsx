'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Is this covered by insurance?',
    answer: "While we don't accept insurance directly, we provide documentation for HSA/FSA reimbursement. Many of our patients successfully use their HSA/FSA accounts for payment. We also provide superbills for potential insurance reimbursement."
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Results vary by treatment and individual. Many patients report improved energy and sleep within 2-3 weeks. Weight loss programs typically show results within the first month. Hormone optimization may take 6-8 weeks for full effects.'
  },
  {
    question: 'Is this available in my state?',
    answer: "We're available in 47 states. During checkout, we'll verify availability in your area. If we're not yet serving your state, we'll notify you when we expand there."
  },
  {
    question: 'Can I cancel my membership?',
    answer: 'Yes, you can cancel after your initial 3-month commitment. We require quarterly billing to ensure treatment continuity and optimal results. Cancellation is easy through your patient portal.'
  },
  {
    question: 'Do I need labs before starting?',
    answer: "It depends on your chosen program. Self-service peptide protocols may not require initial labs. Hormone optimization and GLP-1 programs typically require baseline testing. If you have recent labs (within 90 days), we can often use those."
  },
  {
    question: 'Are the medications FDA-approved?',
    answer: 'We use both FDA-approved medications and compounded medications from licensed pharmacies. All treatments are prescribed by licensed physicians and dispensed by accredited pharmacies following strict quality standards.'
  },
  {
    question: 'How does the online consultation work?',
    answer: 'After completing your health assessment, a board-certified physician reviews your information within 24-48 hours. If approved, your treatment plan is created and medications are shipped directly to you. Follow-ups are conducted via secure messaging or video calls.'
  },
  {
    question: 'What if the treatment doesn\'t work for me?',
    answer: 'Our providers work closely with you to optimize your treatment. If you\'re not seeing results, we\'ll adjust your protocol, run additional tests, or explore alternative options. Our goal is your success.'
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full bg-white rounded-lg px-6 py-4 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <motion.svg
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white border-t">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@clinic.com" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact our support team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}