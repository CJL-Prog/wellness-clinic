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
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {step} of 5</span>
            <span className="text-sm text-gray-600">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="brutal-card p-8">
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
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                      formData.goals.includes(goal.id) 
                        ? 'border-emerald-500 bg-emerald-50 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]' 
                        : 'border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
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
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                      formData.symptoms.includes(symptom)
                        ? 'border-emerald-500 bg-emerald-50 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]'
                        : 'border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                    onClick={() => toggleArrayItem('symptoms', symptom)}
                  >
                    <span className="flex-1">{symptom}</span>
                    {formData.symptoms.includes(symptom) && (
                      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Other steps remain the same structure but with updated button styles */}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white border-2 border-black rounded-lg font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Previous
              </button>
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto brutal-button"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.consent}
                className="ml-auto brutal-button disabled:opacity-50 disabled:cursor-not-allowed"
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