'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

const intakeSchema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  symptoms: z.array(z.string()),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  state: z.string().length(2),
  medications: z.string(),
  conditions: z.array(z.string()),
  consent: z.boolean().refine(val => val === true)
});

type IntakeFormData = z.infer<typeof intakeSchema>;

const GOALS = [
  { 
    id: 'weight_loss', 
    label: 'Lose Weight', 
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), 
    description: 'Sustainable weight loss with medical support' 
  },
  { 
    id: 'energy', 
    label: 'Boost Energy', 
    icon: (
      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ), 
    description: 'Combat fatigue and improve vitality' 
  },
  { 
    id: 'sleep', 
    label: 'Sleep Better', 
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ), 
    description: 'Improve sleep quality and recovery' 
  },
  { 
    id: 'hormones', 
    label: 'Balance Hormones', 
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ), 
    description: 'Optimize hormone levels naturally' 
  },
  { 
    id: 'longevity', 
    label: 'Improve Longevity', 
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ), 
    description: 'Anti-aging and cellular health' 
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

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' }, { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      goals: [],
      symptoms: [],
      conditions: [],
      medications: '',
      consent: false
    }
  });

  const onSubmit = async (data: IntakeFormData) => {
    setLoading(true);
    
    try {
      // Check state restrictions
      const restrictedStates = ['AK', 'HI', 'NY'];
      
      if (restrictedStates.includes(data.state)) {
        alert('Service not yet available in your state. Join our waitlist!');
        await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, state: data.state })
        });
        return;
      }
      
      // Create user account
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: Math.random().toString(36).slice(-8),
        options: {
          data: {
            phone: data.phone,
            state: data.state,
            date_of_birth: data.dateOfBirth
          }
        }
      });
      
      if (error) throw error;
      
      // Save assessment
      const { data: assessment, error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          user_id: authData.user?.id,
          goals: data.goals,
          symptoms: data.symptoms,
          medications: data.medications,
          medical_history: { conditions: data.conditions }
        })
        .select()
        .single();
      
      if (assessmentError) throw assessmentError;
      
      // Redirect to checkout
      router.push(`/checkout?assessment=${assessment.id}`);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    const currentStepFields = getStepFields(step);
    const isValid = currentStepFields.every(field => {
      const value = form.getValues(field as any);
      if (Array.isArray(value)) return value.length > 0;
      return value && value !== '';
    });
    
    if (isValid || step === 4) {
      setStep(s => Math.min(5, s + 1));
    } else {
      alert('Please complete all required fields');
    }
  };

  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const getStepFields = (stepNum: number) => {
    switch(stepNum) {
      case 1: return ['goals'];
      case 2: return ['symptoms'];
      case 3: return ['email', 'phone', 'dateOfBirth', 'state'];
      case 4: return [];
      case 5: return ['consent'];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 5</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Goals */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What are your health goals?</h2>
                <p className="text-gray-600">Select all that apply</p>
              </div>
              
              <div className="space-y-3">
                {GOALS.map((goal) => (
                  <label
                    key={goal.id}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md ${
                      form.watch('goals')?.includes(goal.id) 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={goal.id}
                      className="sr-only"
                      {...form.register('goals')}
                    />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">{goal.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg">{goal.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{goal.description}</div>
                      </div>
                      {form.watch('goals')?.includes(goal.id) && (
                        <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Which symptoms are you experiencing?</h2>
                <p className="text-gray-600">Select all that apply (optional)</p>
              </div>
              
              <div className="space-y-3">
                {SYMPTOMS.map((symptom) => (
                  <label
                    key={symptom}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md ${
                      form.watch('symptoms')?.includes(symptom)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={symptom}
                      className="sr-only"
                      {...form.register('symptoms')}
                    />
                    <span className="flex-1 text-gray-900">{symptom}</span>
                    {form.watch('symptoms')?.includes(symptom) && (
                      <svg className="w-5 h-5 text-blue-500 ml-3" fill="currentColor" viewBox="0 0 20 20">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                <p className="text-gray-600">We need this to create your account</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...form.register('email')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...form.register('phone')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...form.register('dateOfBirth')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    {...form.register('state')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical History */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h2>
                <p className="text-gray-600">Help us understand your health better</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications (if any)
                  </label>
                  <textarea
                    {...form.register('medications')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="List any medications or supplements you're currently taking"
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
                        className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          value={condition}
                          {...form.register('conditions')}
                          className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-900">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Consent */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Consent & Agreement</h2>
                <p className="text-gray-600">Please review and accept our terms</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Medical Consent</h3>
                <p className="mb-3">
                  I understand that this is a telemedicine service and that my healthcare provider 
                  will review my information to determine if treatment is appropriate for me.
                </p>
                <h3 className="font-semibold mb-2">Privacy & HIPAA</h3>
                <p className="mb-3">
                  I understand that my health information will be protected according to HIPAA 
                  regulations and will only be shared with my healthcare team.
                </p>
                <h3 className="font-semibold mb-2">Billing</h3>
                <p>
                  I understand that this is a quarterly subscription service billed every 3 months, 
                  and I can cancel after the initial 3-month period.
                </p>
              </div>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...form.register('consent')}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the medical consent, privacy policy, and billing terms. 
                  I confirm that I am 18 years or older.
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !form.watch('consent')}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
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