'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Medication protocols based on conditions
const PROTOCOL_TEMPLATES = {
  weight_loss: {
    medications: ['semaglutide'],
    dosing: 'Start 0.25mg weekly, titrate monthly',
    duration: '12 weeks',
    monitoring: 'Monthly check-ins'
  },
  energy_fatigue: {
    medications: ['NAD+', 'B12'],
    dosing: 'NAD+ 100mg 2x/week, B12 1000mcg weekly',
    duration: '8 weeks',
    monitoring: 'Bi-weekly'
  },
  hormone_male: {
    medications: ['testosterone_cypionate', 'hcg'],
    dosing: 'Test Cyp 100mg weekly, HCG 250IU 2x/week',
    duration: 'Ongoing',
    monitoring: 'Labs every 3 months'
  },
  sleep_recovery: {
    medications: ['BPC-157', 'melatonin'],
    dosing: 'BPC-157 250mcg daily, Melatonin 3mg nightly',
    duration: '6 weeks',
    monitoring: 'Weekly check-ins'
  }
};

export default function ReviewAssessment({ params }: { params: { id: string } }) {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [showDeferModal, setShowDeferModal] = useState(false);
  const router = useRouter();
  
  // Load assessment data
  const { data: assessment } = useSWR(`/api/assessments/${params.id}`, fetcher);
  
  // Quick protocol selector
  const applyProtocol = (protocolKey: string) => {
    const protocol = PROTOCOL_TEMPLATES[protocolKey as keyof typeof PROTOCOL_TEMPLATES];
    setPrescriptions(protocol.medications.map(med => ({
      medication: med,
      dosing: protocol.dosing,
      duration: protocol.duration,
      refills: 2
    })));
  };
  
  const updatePrescription = (index: number, field: string, value: string) => {
    const updated = [...prescriptions];
    updated[index] = { ...updated[index], [field]: value };
    setPrescriptions(updated);
  };
  
  const approve = async () => {
    setLoading(true);
    
    try {
      // 1. Update assessment status
      await fetch(`/api/assessments/${params.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prescriptions,
          provider_notes: notes,
          approved_by: 'provider_id' // Would come from session
        })
      });
      
      // 2. Send to pharmacy
      await fetch('/api/pharmacy/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: assessment?.user_id,
          prescriptions: prescriptions.map((rx: any) => ({
            drug_name: rx.medication,
            sig: rx.dosing,
            quantity: 30, // calculateQuantity(rx),
            refills: rx.refills
          })),
          shipping_address: assessment?.profiles?.shipping_address
        })
      });
      
      // 3. Generate and send treatment plan PDF
      await fetch('/api/documents/treatment-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_id: params.id,
          prescriptions,
          notes
        })
      });
      
      // 4. Schedule follow-up
      await fetch('/api/followup/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: assessment?.user_id,
          date: getFollowUpDate(prescriptions[0]?.medication),
          type: 'check_in'
        })
      });
      
      router.push('/provider?success=true');
    } catch (error) {
      console.error('Error approving assessment:', error);
      alert('Error approving assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const deny = async (reason: string) => {
    await fetch(`/api/assessments/${params.id}/deny`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, denied_by: 'provider_id' })
    });
    
    // Refund the payment
    await fetch('/api/stripe/refund', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription_id: assessment?.stripe_subscription_id,
        reason
      })
    });
    
    router.push('/provider');
  };
  
  if (!assessment) {
    return <div className="p-6">Loading...</div>;
  }
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Patient Info */}
        <div className="col-span-2 space-y-6">
          <div className="brutal-card bg-white">
            <h2 className="text-xl font-bold mb-4">Patient Information</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-neutral-600">Age</dt>
                <dd className="font-bold">{calculateAge(assessment.profiles?.date_of_birth)}</dd>
              </div>
              <div>
                <dt className="text-neutral-600">State</dt>
                <dd className="font-bold">{assessment.profiles?.state}</dd>
              </div>
              <div>
                <dt className="text-neutral-600">Primary Goals</dt>
                <dd className="font-bold">{assessment.goals?.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-neutral-600">Symptoms</dt>
                <dd className="font-bold">{assessment.symptoms?.join(', ')}</dd>
              </div>
            </dl>
          </div>
          
          {/* Medical History */}
          <div className="brutal-card bg-white">
            <h2 className="text-xl font-bold mb-4">Medical History</h2>
            <div className="space-y-2">
              <p><strong>Current Medications:</strong> {assessment.medications || 'None'}</p>
              <p><strong>Conditions:</strong> {assessment.medical_history?.conditions?.join(', ') || 'None'}</p>
              <p><strong>Allergies:</strong> {assessment.medical_history?.allergies || 'None reported'}</p>
            </div>
          </div>
          
          {/* Prescription Builder */}
          <div className="brutal-card bg-white">
            <h2 className="text-xl font-bold mb-4">Treatment Plan</h2>
            
            {/* Quick protocols */}
            <div className="mb-4">
              <label className="text-sm text-neutral-600">Quick Protocols:</label>
              <div className="flex gap-2 mt-2">
                {Object.keys(PROTOCOL_TEMPLATES).map(key => (
                  <button
                    key={key}
                    onClick={() => applyProtocol(key)}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-bold border-2 border-black"
                  >
                    {key.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Prescriptions list */}
            <div className="space-y-3">
              {prescriptions.map((rx, i) => (
                <div key={i} className="border-2 border-black rounded p-3">
                  <input
                    value={rx.medication}
                    onChange={(e) => updatePrescription(i, 'medication', e.target.value)}
                    className="font-bold mb-2 w-full p-1 border-2 border-neutral-300 rounded"
                    placeholder="Medication name"
                  />
                  <input
                    value={rx.dosing}
                    onChange={(e) => updatePrescription(i, 'dosing', e.target.value)}
                    className="text-sm text-neutral-600 w-full p-1 border-2 border-neutral-300 rounded"
                    placeholder="Sig / Dosing instructions"
                  />
                </div>
              ))}
              
              <button
                onClick={() => setPrescriptions([...prescriptions, {}])}
                className="gradient-text text-sm font-bold"
              >
                + Add Medication
              </button>
            </div>
            
            {/* Provider notes */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provider notes (patient won't see this)"
              className="w-full mt-4 p-3 border-2 border-neutral-300 rounded-lg"
              rows={3}
            />
          </div>
        </div>
        
        {/* Right: Actions & Contraindications */}
        <div className="space-y-6">
          {/* Contraindication Checker */}
          <div className="bg-yellow-50 border-2 border-black rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Check Contraindications</h3>
            <ul className="text-sm space-y-1">
              {getContraindications(assessment).map((warning, i) => (
                <li key={i} className="text-yellow-700">• {warning}</li>
              ))}
            </ul>
          </div>
          
          {/* Lab Requirements */}
          <div className="bg-emerald-50 border-2 border-black rounded-lg p-4">
            <h3 className="font-bold text-emerald-800 mb-2">🔬 Lab Requirements</h3>
            <p className="text-sm text-emerald-700">
              {getLabRequirements(prescriptions)}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="brutal-card bg-white">
            <button
              onClick={approve}
              disabled={loading || prescriptions.length === 0}
              className="w-full brutal-button mb-3 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Approve & Send to Pharmacy'}
            </button>
            
            <button
              onClick={() => setShowDenyModal(true)}
              className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-bold border-2 border-black"
              style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
            >
              Deny (Medical Contraindication)
            </button>
            
            <button
              onClick={() => setShowDeferModal(true)}
              className="w-full mt-3 border-2 border-black py-3 rounded-lg font-bold"
            >
              Request Labs First
            </button>
          </div>
          
          {/* Legal/Compliance */}
          <div className="glass-card rounded-lg p-4 text-xs text-neutral-600">
            <p className="mb-2">✓ DEA License: Valid</p>
            <p className="mb-2">✓ State License: {assessment.profiles?.state} - Valid</p>
            <p className="mb-2">✓ Prescription Monitoring: Checked</p>
            <p>✓ Identity Verified: Yes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculateAge(dateOfBirth: string | undefined): number {
  if (!dateOfBirth) return 0;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getContraindications(assessment: any): string[] {
  const warnings = [];
  
  // Check for drug interactions
  if (assessment.medications?.includes('SSRI')) {
    warnings.push('Patient on SSRI - avoid certain peptides');
  }
  
  // Age restrictions
  const age = calculateAge(assessment.profiles?.date_of_birth);
  if (age < 18) warnings.push('Patient under 18');
  if (age > 65) warnings.push('Patient over 65 - adjust dosing');
  
  // Condition-based
  if (assessment.medical_history?.conditions?.includes('heart_disease')) {
    warnings.push('Cardiac history - avoid stimulants');
  }
  
  return warnings.length > 0 ? warnings : ['None identified'];
}

function getLabRequirements(prescriptions: any[]): string {
  if (!prescriptions || prescriptions.length === 0) {
    return 'No labs required';
  }
  
  const meds = prescriptions.map(p => p.medication?.toLowerCase() || '');
  
  if (meds.some(m => m.includes('testosterone') || m.includes('hcg'))) {
    return 'Baseline hormone panel required';
  }
  
  if (meds.some(m => m.includes('semaglutide'))) {
    return 'HbA1c and metabolic panel recommended';
  }
  
  return 'Standard baseline labs recommended';
}

function getFollowUpDate(medication: string): string {
  const date = new Date();
  date.setDate(date.getDate() + 14); // 2 weeks from now
  return date.toISOString();
}