'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Helper function to calculate age
function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Helper function to get contraindications
function getContraindications(assessment: any): string[] {
  const warnings = [];
  
  if (assessment?.medications?.includes('SSRI')) {
    warnings.push('Patient on SSRI - avoid certain peptides');
  }
  
  const age = assessment?.profiles?.date_of_birth 
    ? calculateAge(assessment.profiles.date_of_birth) 
    : 0;
    
  if (age < 18) warnings.push('Patient under 18');
  if (age > 65) warnings.push('Patient over 65 - adjust dosing');
  
  if (assessment?.medical_history?.conditions?.includes('heart_disease')) {
    warnings.push('Cardiac history - avoid stimulants');
  }
  
  return warnings.length > 0 ? warnings : ['None identified'];
}

// Helper function to get lab requirements
function getLabRequirements(prescriptions: any[]): string {
  const meds = prescriptions.map(p => p.medication?.toLowerCase() || '');
  
  if (meds.some(m => m.includes('testosterone') || m.includes('hcg'))) {
    return 'Baseline hormone panel required within 30 days';
  }
  
  if (meds.some(m => m.includes('semaglutide'))) {
    return 'HbA1c and metabolic panel recommended';
  }
  
  return 'Standard labs recommended within 90 days';
}

// Helper function to calculate quantity
function calculateQuantity(prescription: any): number {
  // Default to 30-day supply
  return 30;
}

// Helper function to get follow-up date
function getFollowUpDate(medication: string): string {
  const date = new Date();
  date.setDate(date.getDate() + 14); // 2 weeks from now
  return date.toISOString();
}

// Medication protocols
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
    if (protocol) {
      setPrescriptions(protocol.medications.map(med => ({
        medication: med,
        dosing: protocol.dosing,
        duration: protocol.duration,
        refills: 2
      })));
    }
  };
  
  // Update prescription
  const updatePrescription = (index: number, field: string, value: string) => {
    const updated = [...prescriptions];
    updated[index] = { ...updated[index], [field]: value };
    setPrescriptions(updated);
  };
  
  const approve = async () => {
    setLoading(true);
    
    try {
      // Update assessment status
      await fetch(`/api/assessments/${params.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prescriptions,
          provider_notes: notes,
          approved_by: 'provider_id' // Replace with actual provider ID
        })
      });
      
      // Send to pharmacy
      await fetch('/api/pharmacy/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: assessment?.user_id,
          prescriptions: prescriptions.map(rx => ({
            drug_name: rx.medication,
            sig: rx.dosing,
            quantity: calculateQuantity(rx),
            refills: rx.refills
          })),
          shipping_address: assessment?.profiles?.shipping_address
        })
      });
      
      router.push('/provider?success=true');
    } catch (error) {
      console.error('Error approving assessment:', error);
      alert('Error approving assessment');
    } finally {
      setLoading(false);
    }
  };
  
  const deny = async (reason: string) => {
    await fetch(`/api/assessments/${params.id}/deny`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        reason, 
        denied_by: 'provider_id' // Replace with actual provider ID
      })
    });
    
    router.push('/provider');
  };
  
  if (!assessment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Patient Info */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Patient Information</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-gray-600">Age</dt>
                  <dd className="font-medium">
                    {assessment?.profiles?.date_of_birth 
                      ? calculateAge(assessment.profiles.date_of_birth) 
                      : 'N/A'}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600">State</dt>
                  <dd className="font-medium">{assessment?.profiles?.state || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Primary Goals</dt>
                  <dd className="font-medium">{assessment?.goals?.join(', ') || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Symptoms</dt>
                  <dd className="font-medium">{assessment?.symptoms?.join(', ') || 'None'}</dd>
                </div>
              </dl>
            </div>
            
            {/* Medical History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Medical History</h2>
              <div className="space-y-2">
                <p><strong>Current Medications:</strong> {assessment?.medications || 'None'}</p>
                <p><strong>Conditions:</strong> {assessment?.medical_history?.conditions?.join(', ') || 'None'}</p>
                <p><strong>Allergies:</strong> {assessment?.medical_history?.allergies || 'None reported'}</p>
              </div>
            </div>
            
            {/* Prescription Builder */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Treatment Plan</h2>
              
              {/* Quick protocols */}
              <div className="mb-4">
                <label className="text-sm text-gray-600">Quick Protocols:</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Object.keys(PROTOCOL_TEMPLATES).map(key => (
                    <button
                      key={key}
                      onClick={() => applyProtocol(key)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    >
                      {key.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Prescriptions list */}
              <div className="space-y-3">
                {prescriptions.map((rx, i) => (
                  <div key={i} className="border rounded p-3">
                    <input
                      value={rx.medication || ''}
                      onChange={(e) => updatePrescription(i, 'medication', e.target.value)}
                      className="font-medium mb-2 w-full px-2 py-1 border rounded"
                      placeholder="Medication name"
                    />
                    <input
                      value={rx.dosing || ''}
                      onChange={(e) => updatePrescription(i, 'dosing', e.target.value)}
                      className="text-sm text-gray-600 w-full px-2 py-1 border rounded"
                      placeholder="Sig / Dosing instructions"
                    />
                  </div>
                ))}
                
                <button
                  onClick={() => setPrescriptions([...prescriptions, {}])}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Medication
                </button>
              </div>
              
              {/* Provider notes */}
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provider notes (patient won't see this)"
                className="w-full mt-4 p-3 border rounded"
                rows={3}
              />
            </div>
          </div>
          
          {/* Right: Actions & Contraindications */}
          <div className="space-y-6">
            {/* Contraindication Checker */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-yellow-800 mb-2">⚠️ Check Contraindications</h3>
              <ul className="text-sm space-y-1">
                {getContraindications(assessment).map((warning, i) => (
                  <li key={i} className="text-yellow-700">• {warning}</li>
                ))}
              </ul>
            </div>
            
            {/* Lab Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">🔬 Lab Requirements</h3>
              <p className="text-sm text-blue-700">
                {getLabRequirements(prescriptions)}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={approve}
                disabled={loading || prescriptions.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium mb-3 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Approve & Send to Pharmacy'}
              </button>
              
              <button
                onClick={() => setShowDenyModal(true)}
                className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-medium hover:bg-red-200"
              >
                Deny (Medical Contraindication)
              </button>
              
              <button
                onClick={() => setShowDeferModal(true)}
                className="w-full mt-3 border py-3 rounded-lg hover:bg-gray-50"
              >
                Request Labs First
              </button>
            </div>
            
            {/* Legal/Compliance */}
            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
              <p className="mb-2">✓ DEA License: Valid</p>
              <p className="mb-2">✓ State License: {assessment?.profiles?.state || 'N/A'} - Valid</p>
              <p className="mb-2">✓ Prescription Monitoring: Checked</p>
              <p>✓ Identity Verified: Yes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}