'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const timeline = [
  {
    day: 'Day 1',
    title: 'Complete Assessment',
    description: 'Fill out our comprehensive health questionnaire and medical history',
    icon: '📋',
    color: 'from-blue-500 to-blue-600'
  },
  {
    day: 'Day 2',
    title: 'Provider Review',
    description: 'Board-certified physician reviews your information and creates your treatment plan',
    icon: '👨‍⚕️',
    color: 'from-purple-500 to-purple-600'
  },
  {
    day: 'Day 3-5',
    title: 'Medications Ship',
    description: 'Your personalized medications are prepared and shipped directly to you',
    icon: '📦',
    color: 'from-green-500 to-green-600'
  },
  {
    day: 'Week 2+',
    title: 'Ongoing Support',
    description: 'Regular check-ins, dosage adjustments, and continuous optimization',
    icon: '🌟',
    color: 'from-amber-500 to-amber-600'
  }
];

const faqs = [
  {
    question: 'How do online consultations work?',
    answer: 'After completing your health assessment, a licensed physician reviews your information within 24-48 hours. They create a personalized treatment plan based on your goals and medical history. All communication happens through our secure patient portal.'
  },
  {
    question: 'What states do you serve?',
    answer: 'We currently serve 47 states. During checkout, we\'ll verify availability in your area. If we\'re not yet in your state, you can join our waitlist to be notified when we expand.'
  },
  {
    question: 'How are medications delivered?',
    answer: 'All medications are shipped in discreet packaging directly to your door. We use temperature-controlled shipping when necessary and provide tracking information for every order.'
  },
  {
    question: 'Can I use my HSA/FSA?',
    answer: 'Yes! Our services are HSA/FSA eligible. We provide detailed receipts that you can submit for reimbursement. Many patients successfully use their HSA/FSA cards directly at checkout.'
  }
];

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized treatment in days, not months. 
              100% online, physician-supervised, delivered to you.
            </p>
            <Link
              href="/intake"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Start Your Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Your Journey Timeline</h2>
            <p className="text-xl text-gray-600">From assessment to treatment in under a week</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Background line - positioned behind everything */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-green-200" />
              
              {/* Timeline items */}
              <div className="relative space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Content card */}
                      <div className="w-5/12">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                          <span className="text-sm font-semibold text-gray-500">{item.day}</span>
                          <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      
                      {/* Center icon with higher z-index */}
                      <div className="w-2/12 flex justify-center">
                        <div className={`
                          relative z-10 w-20 h-20 rounded-full 
                          bg-gradient-to-br ${item.color}
                          flex items-center justify-center text-3xl
                          shadow-lg ring-4 ring-white
                        `}>
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="w-5/12" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">Everything you need for your health transformation</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🩺',
                title: 'Physician Consultation',
                description: 'Board-certified doctors review your health history and create personalized treatment plans'
              },
              {
                icon: '💊',
                title: 'Premium Medications',
                description: 'FDA-approved medications and compounded therapies from licensed pharmacies'
              },
              {
                icon: '📱',
                title: 'Ongoing Support',
                description: 'Regular check-ins, dosage adjustments, and 24/7 access to your care team'
              },
              {
                icon: '🔬',
                title: 'Lab Testing',
                description: 'Comprehensive biomarker analysis to track your progress and optimize treatment'
              },
              {
                icon: '📦',
                title: 'Discreet Delivery',
                description: 'Medications shipped directly to you in unmarked, temperature-controlled packaging'
              },
              {
                icon: '💳',
                title: 'HSA/FSA Eligible',
                description: 'Use your health savings account and get detailed receipts for reimbursement'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Common Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ready to get started?</p>
            <Link
              href="/intake"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Begin Your Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}