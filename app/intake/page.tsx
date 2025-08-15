'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GOALS = [
  { id: 'weight_loss', label: 'Lose Weight', icon: '🎯', description: 'Sustainable weight loss with medical support' },
  { id: 'energy', label: 'Boost Energy', icon: '⚡', description: 'Combat fatigue and improve vitality' },
  { id: 'sleep', label: 'Sleep Better', icon: '😴', description: 'Improve sleep quality and recovery' },
  { id: 'hormones', label: 'Balance Hormones', icon: '⚖️', description: 'Optimize hormone levels naturally' },
  { id: 'longevity', label: 'Improve Longevity', icon: '🌟', description: 'Anti-aging and cellular health' },
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

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    goals: [] as string[],
    symptoms: [] as string[],
    email: '',
    phone: '',
    dateOfBirth: '',
    state: '',
    medications: '',
    conditions: [] as string[],
    consent: false
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert('Please agree to the terms to continue');
      return;
    }
    
    setLoading(true);
    
    try {
      // For now, just redirect to a success page
      // In production, this would create the user account and assessment
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just show success
      alert('Assessment submitted successfully! You would normally be redirected to checkout.');
      router.push('/');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    // Basic validation
    if (step === 1 && formData.goals.length === 0) {
      alert('Please select at least one goal');
      return;
    }
    if (step === 3) {
      if (!formData.email || !formData.phone || !formData.dateOfBirth || !formData.state) {
        alert('Please fill in all required fields');
        return;
      }
    }
    
    setStep(s => Math.min(5, s + 1));
  };

  const prevStep = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {step} of 5</span>
            <span className="text-sm text-gray-600">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Goals */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">What are your health goals?</h2>
                <p className="text-gray-600">Select all that apply</p>
              </div>
              
              <div className="space-y-3">
                {GOALS.map((goal) => (
                  <label
                    key={goal.id}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300 ${
                      formData.goals.includes(goal.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => toggleArrayItem('goals', goal.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <div className="font-semibold">{goal.label}</div>
                        <div className="text-sm text-gray-600">{goal.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Which symptoms are you experiencing?</h2>
                <p className="text-gray-600">Select all that apply</p>
              </div>
              
              <div className="space-y-3">
                {SYMPTOMS.map((symptom) => (
                  <label
                    key={symptom}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300 ${
                      formData.symptoms.includes(symptom)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => toggleArrayItem('symptoms', symptom)}
                  >
                    <span className="flex-1">{symptom}</span>
                    {formData.symptoms.includes(symptom) && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Demographics */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
                <p className="text-gray-600">We'll use this to create your account</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CA"
                    maxLength={2}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical History */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Medical History</h2>
                <p className="text-gray-600">This helps us personalize your treatment</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <textarea
                  value={formData.medications}
                  onChange={(e) => updateFormData('medications', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="List any medications you're currently taking..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions
                </label>
                <div className="space-y-2">
                  {CONDITIONS.map((condition) => (
                    <label
                      key={condition}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.conditions.includes(condition)}
                        onChange={() => toggleArrayItem('conditions', condition)}
                        className="mr-3"
                      />
                      <span>{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Consent */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Consent & Agreement</h2>
                <p className="text-gray-600">Please review and agree to continue</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
                <p>By checking the box below, you agree that:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You are 18 years or older</li>
                  <li>The information you provided is accurate</li>
                  <li>You consent to telehealth treatment</li>
                  <li>You understand this is a subscription service</li>
                  <li>You agree to our Terms of Service and Privacy Policy</li>
                </ul>
              </div>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => updateFormData('consent', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  I agree to the terms above and consent to treatment
                </span>
              </label>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.consent}
                className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Complete Assessment'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}