'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import useSWR from 'swr';

// Format date helper
function formatDate(dateString: string | undefined) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['overview', 'medications', 'labs', 'appointments', 'billing'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-3 capitalize ${
                  activeTab === tab 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'medications' && <Medications />}
        {activeTab === 'labs' && <Labs />}
        {activeTab === 'appointments' && <Appointments />}
        {activeTab === 'billing' && <Billing />}
      </div>
    </div>
  );
}

function Overview() {
  const { data: subscription } = useSWR('/api/subscription/current', fetcher);
  const { data: nextShipment } = useSWR('/api/shipments/next', fetcher);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm">Treatment Status</h3>
        <p className="text-2xl font-bold text-green-600">Active</p>
        <p className="text-sm text-gray-500 mt-2">
          Started {formatDate(subscription?.created_at)}
        </p>
      </div>
      
      {/* Next Shipment */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm">Next Shipment</h3>
        <p className="text-2xl font-bold">{formatDate(nextShipment?.ship_date)}</p>
        <p className="text-sm text-gray-500 mt-2">
          Tracking: {nextShipment?.tracking || 'Pending'}
        </p>
      </div>
      
      {/* Next Appointment */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm">Next Check-in</h3>
        <p className="text-2xl font-bold">Mar 15</p>
        <button className="text-sm text-blue-600 mt-2 hover:underline">
          Reschedule
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="col-span-full bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg text-center hover:shadow transition-shadow">
            <span className="text-2xl mb-2 block">📦</span>
            Track Shipment
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow transition-shadow">
            <span className="text-2xl mb-2 block">💬</span>
            Message Provider
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow transition-shadow">
            <span className="text-2xl mb-2 block">🔬</span>
            View Lab Results
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow transition-shadow">
            <span className="text-2xl mb-2 block">💳</span>
            Update Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function Medications() {
  const [medications, setMedications] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch medications
    fetch('/api/medications')
      .then(res => res.json())
      .then(data => setMedications(data || []));
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Your Medications</h2>
      
      {medications.length === 0 ? (
        <p className="text-gray-500">No active medications</p>
      ) : (
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold">{med.name}</h3>
              <p className="text-gray-600 text-sm">{med.dosage}</p>
              <p className="text-gray-500 text-sm mt-2">
                Next refill: {formatDate(med.next_refill)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Labs() {
  const [labResults, setLabResults] = useState<any[]>([]);
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Lab Results</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Comprehensive Panel</h3>
              <p className="text-gray-600 text-sm">Ordered: Jan 15, 2024</p>
            </div>
            <button className="text-blue-600 text-sm hover:underline">
              View Results →
            </button>
          </div>
        </div>
        
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Order New Labs
        </button>
      </div>
    </div>
  );
}

function Appointments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold">Provider Check-in</h3>
          <p className="text-gray-600">March 15, 2024 at 2:00 PM EST</p>
          <div className="mt-3 space-x-2">
            <button className="text-blue-600 text-sm hover:underline">
              Join Video Call
            </button>
            <button className="text-gray-600 text-sm hover:underline">
              Reschedule
            </button>
          </div>
        </div>
        
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Schedule Appointment
        </button>
      </div>
    </div>
  );
}

function Billing() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  
  const cancelSubscription = async (subId: string) => {
    if (!confirm('Cancel after your 3-month commitment ends?')) return;
    
    await fetch('/api/subscription/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        subscription_id: subId,
        cancel_at_period_end: true
      })
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Active Subscriptions</h2>
        
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Comprehensive Plan</h3>
              <p className="text-gray-600">$399/month • Billed quarterly</p>
              <p className="text-sm text-gray-500">
                Next billing: Apr 1, 2024
              </p>
            </div>
            <div className="space-x-2">
              <button className="text-blue-600 text-sm hover:underline">
                Update Card
              </button>
              <button 
                onClick={() => cancelSubscription('sub_123')}
                className="text-red-600 text-sm hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        
        {/* HSA/FSA Info */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h3 className="font-medium mb-2">HSA/FSA Eligible</h3>
          <p className="text-sm text-gray-600">
            Download your itemized receipt for reimbursement:
          </p>
          <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
            Download Receipt →
          </button>
        </div>
      </div>
    </div>
  );
}