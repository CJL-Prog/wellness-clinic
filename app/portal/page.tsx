'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const supabase = createClientComponentClient();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['overview', 'medications', 'labs', 'appointments', 'billing'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-3 capitalize ${
                  activeTab === tab ? 'border-b-2 border-blue-500' : ''
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
        <button className="text-sm text-blue-600 mt-2">Reschedule</button>
      </div>
      
      {/* Quick Actions */}
      <div className="col-span-full bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg text-center hover:shadow">
            📦 Track Shipment
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow">
            💬 Message Provider
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow">
            🔬 View Lab Results
          </button>
          <button className="bg-white p-4 rounded-lg text-center hover:shadow">
            💳 Update Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function Medications() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Current Medications</h2>
      <p className="text-gray-600">Your medications will appear here.</p>
    </div>
  );
}

function Labs() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Lab Results</h2>
      <p className="text-gray-600">Your lab results will appear here.</p>
    </div>
  );
}

function Appointments() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <p className="text-gray-600">Your appointments will appear here.</p>
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
        cancel_at_period_end: true // Cancels after current period
      })
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Active Subscriptions</h2>
        
        {subscriptions.length === 0 ? (
          <p className="text-gray-600">No active subscriptions.</p>
        ) : (
          subscriptions.map((sub: any) => (
            <div key={sub.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{sub.plan_type} Plan</h3>
                  <p className="text-gray-600">${sub.amount}/month • Billed quarterly</p>
                  <p className="text-sm text-gray-500">
                    Next billing: {formatDate(sub.current_period_end)}
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="text-blue-600 text-sm">Update Card</button>
                  <button 
                    onClick={() => cancelSubscription(sub.id)}
                    className="text-red-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* HSA/FSA Info */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h3 className="font-medium mb-2">HSA/FSA Eligible</h3>
          <p className="text-sm text-gray-600">
            Download your itemized receipt for reimbursement:
          </p>
          <button className="mt-2 text-blue-600 text-sm font-medium">
            Download Receipt →
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function
function formatDate(date: string | undefined): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
}