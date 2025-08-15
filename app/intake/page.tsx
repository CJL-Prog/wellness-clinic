'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createSupabaseClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

// This form is worth $399/month per completion
const intakeSchema = z.object({
  // Step 1: Goals
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  
  // Step 2: Symptoms  
  symptoms: z.array(z.string()),
  
  // Step 3: Demographics
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string(),
  state: z.string().length(2),
  
  // Step 4: Medical
  medications: z.string(),
  conditions: z.array(z.string()),
  
  // Step 5: Consent
  consent: z.boolean().refine(val => val === true)
});

type IntakeFormData = z.infer<typeof intakeSchema>;

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
      const supabase = createSupabaseClient();
      
      // 1. Check state restrictions
      const { data: restricted } = await supabase
        .from('restricted_states')
        .select('*')
        .eq('state_code', data.state)
        .single();
        
      if (restricted) {
        // Show waitlist modal
        alert('Service not yet available in your state. Join our waitlist!');
        // Capture email for waitlist
        await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, state: data.state })
        });
        return;
      }
      
      // 2. Create user account
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: Math.random().toString(36).slice(-8), // Temp password
        options: {
          data: {
            phone: data.phone,
            state: data.state,
            date_of_birth: data.dateOfBirth
          }
        }
      });
      
      if (error) throw error;
      
      // 3. Save assessment
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
      
      // 4. Redirect to checkout
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
    
    if (isValid) {
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
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
                      form.watch('goals')?.includes(goal.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={goal.id}
                      className="sr-only"
                      {...form.register('goals')}
                    />
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
                      form.watch('symptoms')?.includes(symptom)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={symptom}
                      className="sr-only"
                      {...form.register('symptoms')}
                    />
                    <span className="flex-1">{symptom}</span>
                    {form.watch('symptoms')?.includes(symptom) && (
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
                    {...form.register('email')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    {...form.register('state')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CA"
                    maxLength={2}
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
                  {...form.register('medications')}
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
                        value={condition}
                        {...form.register('conditions')}
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
                  {...form.register('consent')}
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
                disabled={loading || !form.watch('consent')}
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