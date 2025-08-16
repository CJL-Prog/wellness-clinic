'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I get started with treatment?',
        answer: 'Getting started is easy! First, complete our online health assessment which takes about 5 minutes. A licensed physician will review your information within 24-48 hours. If approved, your personalized medications will be shipped directly to you.'
      },
      {
        question: 'Do I need to visit a doctor in person?',
        answer: 'No in-person visits are required. All consultations are conducted online through our secure platform. However, we may recommend lab work which can be done at any Quest or LabCorp location near you.'
      },
      {
        question: 'What states do you serve?',
        answer: 'We currently serve 47 states. During checkout, we\'ll verify if we can serve your location. If we\'re not yet in your state, you can join our waitlist to be notified when we expand.'
      }
    ]
  },
  {
    category: 'Pricing & Billing',
    questions: [
      {
        question: 'How much does it cost?',
        answer: 'We offer three membership plans: Essential ($199/month), Comprehensive ($399/month), and Elite ($599/month). All plans are billed quarterly with a 3-month minimum commitment. You can save 10% by choosing quarterly billing upfront.'
      },
      {
        question: 'Is this covered by insurance?',
        answer: 'While we don\'t accept insurance directly, our services are HSA/FSA eligible. We provide detailed receipts that you can submit to your insurance for potential reimbursement. Many patients successfully use their HSA/FSA cards at checkout.'
      },
      {
        question: 'Can I cancel my membership?',
        answer: 'Yes, you can cancel after your initial 3-month commitment. We require quarterly billing to ensure treatment continuity and optimal results. You can easily cancel through your patient portal.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and HSA/FSA cards. Payment is processed securely through Stripe.'
      }
    ]
  },
  {
    category: 'Medications & Treatment',
    questions: [
      {
        question: 'Are the medications FDA-approved?',
        answer: 'We use both FDA-approved medications and compounded medications from licensed pharmacies. All treatments are prescribed by licensed physicians and dispensed by accredited pharmacies following strict quality standards.'
      },
      {
        question: 'How are medications delivered?',
        answer: 'Medications are shipped in discreet, unmarked packaging directly to your door. We use temperature-controlled shipping when necessary and provide tracking information for every order.'
      },
      {
        question: 'How quickly will I see results?',
        answer: 'Results vary by treatment and individual. Many patients report improved energy and sleep within 2-3 weeks. Weight loss programs typically show results within the first month. Hormone optimization may take 6-8 weeks for full effects.'
      },
      {
        question: 'What if the treatment doesn\'t work for me?',
        answer: 'Our providers work closely with you to optimize your treatment. If you\'re not seeing results, we\'ll adjust your protocol, run additional tests, or explore alternative options. Our goal is your success.'
      }
    ]
  },
  {
    category: 'Safety & Privacy',
    questions: [
      {
        question: 'Is online treatment safe?',
        answer: 'Yes, our telemedicine platform is safe and secure. All providers are licensed physicians who follow the same standards of care as traditional clinics. We use HIPAA-compliant technology to protect your privacy.'
      },
      {
        question: 'Who will have access to my medical information?',
        answer: 'Your medical information is strictly confidential and HIPAA-protected. Only your assigned healthcare provider and necessary pharmacy staff will have access to your records.'
      },
      {
        question: 'Are there any side effects?',
        answer: 'All medications can have potential side effects. Your provider will discuss these with you and monitor your progress. We start with conservative doses and adjust based on your response and tolerance.'
      }
    ]
  },
  {
    category: 'Lab Testing',
    questions: [
      {
        question: 'Do I need labs before starting?',
        answer: 'It depends on your chosen program. Some peptide protocols may not require initial labs. Hormone optimization and GLP-1 programs typically require baseline testing. If you have recent labs (within 90 days), we can often use those.'
      },
      {
        question: 'Where do I get labs done?',
        answer: 'You can get labs done at any Quest or LabCorp location nationwide. We also offer in-home phlebotomy services for an additional fee.'
      },
      {
        question: 'How often will I need follow-up labs?',
        answer: 'Follow-up lab frequency depends on your treatment. Hormone therapy typically requires labs every 3 months initially, then every 6 months once stable. Your provider will create a personalized monitoring schedule.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(cat => cat.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Questions
          </button>
          {faqs.map(category => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, questionIndex) => (
                  <motion.div
                    key={questionIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: questionIndex * 0.05 }}
                    className="bg-white rounded-lg shadow-sm"
                  >
                    <button
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 pr-8">{item.question}</h3>
                        <motion.svg
                          animate={{ rotate: openIndex === `${categoryIndex}-${questionIndex}` ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 text-gray-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === `${categoryIndex}-${questionIndex}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4">
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to help</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@clinic.com" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a 
              href="tel:1-800-XXX-XXXX" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}