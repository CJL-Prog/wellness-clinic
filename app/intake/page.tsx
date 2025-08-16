'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const GOALS = [
  { 
    id: 'weight_loss', 
    label: 'Lose Weight', 
    icon: '🎯', 
    description: 'Sustainable medical weight loss',
    color: 'from-orange-400 to-red-400'
  },
  { 
    id: 'energy', 
    label: 'Boost Energy', 
    icon: '⚡', 
    description: 'Combat fatigue and brain fog',
    color: 'from-yellow-400 to-orange-400'
  },
  { 
    id: 'sleep', 
    label: 'Sleep Better', 
    icon: '😴', 
    description: 'Improve sleep quality & recovery',
    color: 'from-blue-400 to-purple-400'
  },
  { 
    id: 'hormones', 
    label: 'Balance Hormones', 
    icon: '⚖️', 
    description: 'Optimize hormone levels',
    color: 'from-purple-400 to-pink-400'
  },
  { 
    id: 'longevity', 
    label: 'Anti-Aging', 
    icon: '🌟', 
    description: 'Cellular health & longevity',
    color: 'from-green-400 to-teal-400'
  },
];

const SYMPTOMS = [
  'Low energy or fatigue',
  'Weight gain or difficulty losing weight',
  'Poor sleep or insomnia',
  'Brain fog or difficulty concentrating',
  'Low libido or sexual dysfunction',
  'Mood changes or irritability',
  'Joint pain or stiffness',
  'Hair loss or thinning',
  'Hot flashes or night sweats',
  'Muscle loss or weakness',
];

const CONDITIONS = [
  'High blood pressure',
  'Diabetes',
  'Heart disease',
  'Thyroid disorder',
  'Depression or anxiety',
  'Sleep apnea',
  'Autoimmune condition',
  'Cancer history',
  'None of the above'
];

const STATES = [
  'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'ID', 
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 
  'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NC', 
  'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 
  'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    goals: [] as string[],
    symptoms: [] as string[],
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    state: '',
    medications: '',
    conditions: [] as string[],
    allergies: '',
    consent: false,
    marketing: false
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('intakeFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('intakeFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user updates it
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayItem = (field: 'goals' | 'symptoms' | 'conditions', item: string) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(item)) {
        return { ...prev, [field]: current.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...current, item] };
      }
    });
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    switch (stepNumber) {
      case 1:
        if (formData.goals.length === 0) {
          newErrors.goals = 'Please select at least one health goal';
        }
        break;
      case 2:
        // Symptoms are optional
        break;
      case 3:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Invalid phone number';
        }
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.state) newErrors.state = 'State is required';
        break;
      case 4:
        // Medical history is optional
        break;
      case 5:
        if (!formData.consent) {
          newErrors.consent = 'You must agree to the terms to continue';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => Math.min(5, s + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(5)) {
      return;
    }
    
    setLoading(true);
    
    try {
      // API call would go here
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear localStorage after successful submission
      localStorage.removeItem('intakeFormData');
      
      // Redirect to checkout
      router.push('/checkout?assessment=success');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const phone = value.replace(/\D/g, '');
    const match = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Step {step} of 5
            </span>
            <span className="text-sm font-semibold text-primary-600">
              {Math.round((step / 5) * 100)}% Complete
            </span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 gradient-medical rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="glass-card rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Goals */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🎯
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">What are your health goals?</h2>
                  <p className="text-gray-600">Select all that apply to personalize your treatment</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {GOALS.map((goal) => (
                    <motion.label
                      key={goal.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative overflow-hidden rounded-2xl cursor-pointer transition-all
                        ${formData.goals.includes(goal.id) 
                          ? 'brutal-card transform scale-[1.02]' 
                          : 'glass-card hover:shadow-lg'}
                      `}
                      onClick={() => toggleArrayItem('goals', goal.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.span 
                            className="text-3xl"
                            animate={formData.goals.includes(goal.id) ? { scale: [1, 1.2, 1] } : {}}
                          >
                            {goal.icon}
                          </motion.span>
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{goal.label}</div>
                            <div className="text-sm text-gray-600">{goal.description}</div>
                          </div>
                          {formData.goals.includes(goal.id) && (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 text-primary-500" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </div>
                      </div>
                      {formData.goals.includes(goal.id) && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${goal.color} opacity-10`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                        />
                      )}
                    </motion.label>
                  ))}
                </div>
                
                {errors.goals && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {errors.goals}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Step 2: Symptoms */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    🩺
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">Which symptoms are you experiencing?</h2>
                  <p className="text-gray-600">This helps us create your personalized treatment plan</p>
                </div>
                
                <div className="grid gap-3">
                  {SYMPTOMS.map((symptom, index) => (
                    <motion.label
                      key={symptom}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        flex items-center p-4 rounded-xl cursor-pointer transition-all
                        ${formData.symptoms.includes(symptom)
                          ? 'glass-card bg-primary-50 border-2 border-primary-500'
                          : 'glass-card hover:shadow-md'}
                      `}
                      onClick={() => toggleArrayItem('symptoms', symptom)}
                    >
                      <div className="flex-1 font-medium">{symptom}</div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${formData.symptoms.includes(symptom) 
                          ? 'border-primary-500 bg-primary-500' 
                          : 'border-gray-300'}
                      `}>
                        {formData.symptoms.includes(symptom) && (
                          <motion.svg 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 text-white" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.label>
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  {formData.symptoms.length} symptoms selected
                </div>
              </motion.div>
            )}

            {/* Step 3: Demographics */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                  >
                    👤
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">Let's get to know you</h2>
                  <p className="text-gray-600">We'll use this to create your account</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formatPhone(formData.phone)}
                      onChange={(e) => updateFormData('phone', e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => updateFormData('state', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.state ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                    >
                      <option value="">Select State</option>
                      {STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Medical History */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ pulse: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💊
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">Medical History</h2>
                  <p className="text-gray-600">This helps ensure safe and effective treatment</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => updateFormData('medications', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    rows={3}
                    placeholder="List any medications or supplements you're currently taking..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Known Allergies
                  </label>
                  <textarea
                    value={formData.allergies}
                    onChange={(e) => updateFormData('allergies', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    rows={2}
                    placeholder="List any drug or food allergies..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Medical Conditions
                  </label>
                  <div className="grid gap-3">
                    {CONDITIONS.map((condition) => (
                      <label
                        key={condition}
                        className={`
                          flex items-center p-3 rounded-xl cursor-pointer transition-all
                          ${formData.conditions.includes(condition)
                            ? 'glass-card bg-primary-50 border-2 border-primary-500'
                            : 'glass-card hover:shadow-md'}
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={formData.conditions.includes(condition)}
                          onChange={() => toggleArrayItem('conditions', condition)}
                          className="sr-only"
                        />
                        <span className="flex-1">{condition}</span>
                        <div className={`
                          w-5 h-5 rounded flex items-center justify-center transition-all
                          ${formData.conditions.includes(condition) 
                            ? 'bg-primary-500' 
                            : 'bg-gray-200'}
                        `}>
                          {formData.conditions.includes(condition) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Consent */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    ✅
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">Almost Done!</h2>
                  <p className="text-gray-600">Please review and agree to continue</p>
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-3">By continuing, you acknowledge:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You are 18 years or older
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      The information you provided is accurate and complete
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You consent to telehealth treatment
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      This is a subscription service with quarterly billing
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You agree to our Terms of Service and Privacy Policy
                    </li>
                  </ul>
                </div>
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateFormData('consent', e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    I have read, understood, and agree to the above terms and conditions
                  </span>
                </label>
                
                {errors.consent && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.consent}
                  </motion.p>
                )}
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.marketing}
                    onChange={(e) => updateFormData('marketing', e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    Send me health tips and exclusive offers (optional)
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="brutal-button-secondary px-6 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ← Previous
              </motion.button>
            )}
            
            {step < 5 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="brutal-button px-8 py-3 ml-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading || !formData.consent}
                className={`brutal-button px-8 py-3 ml-auto ${
                  loading || !formData.consent ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={!loading && formData.consent ? { scale: 1.02 } : {}}
                whileTap={!loading && formData.consent ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.span>
                    Processing...
                  </span>
                ) : (
                  'Complete Assessment'
                )}
              </motion.button>
            )}
          </div>
        </motion.form>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            HIPAA Compliant
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            256-bit SSL Encrypted
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Board Certified Physicians
          </div>
        </motion.div>
      </div>
    </div>
  );
}