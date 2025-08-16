'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {['overview', 'medications', 'labs', 'appointments', 'billing'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-3 capitalize font-bold transition-all ${
                  activeTab === tab 
                    ? 'border-b-4 border-emerald-500 text-emerald-600' 
                    : 'hover:text-gray-900'
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
      <div className="brutal-card p-6">
        <h3 className="text-gray-600 text-sm font-bold">Treatment Status</h3>
        <p className="text-2xl font-bold text-emerald-600">Active</p>
        <p className="text-sm text-gray-500 mt-2">
          Started {formatDate(subscription?.created_at)}
        </p>
      </div>
      
      {/* Next Shipment */}
      <div className="brutal-card p-6">
        <h3 className="text-gray-600 text-sm font-bold">Next Shipment</h3>
        <p className="text-2xl font-bold">{formatDate(nextShipment?.ship_date)}</p>
        <p className="text-sm text-gray-500 mt-2">
          Tracking: {nextShipment?.tracking || 'Pending'}
        </p>
      </div>
      
      {/* Next Appointment */}
      <div className="brutal-card p-6">
        <h3 className="text-gray-600 text-sm font-bold">Next Check-in</h3>
        <p className="text-2xl font-bold">Mar 15</p>
        <button className="text-sm text-emerald-600 font-bold mt-2 hover:underline">Reschedule</button>
      </div>
      
      {/* Quick Actions */}
      <div className="col-span-full bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-500">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            📦 Track Shipment
          </button>
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            💬 Message Provider
          </button>
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            🔬 View Lab Results
          </button>
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            💳 Update Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function Medications() {
  return (
    <div className="brutal-card p-6">
      <h2 className="text-xl font-bold mb-4">Current Medications</h2>
      <p className="text-gray-600">Your medications will appear here.</p>
    </div>
  );
}

function Labs() {
  return (
    <div className="brutal-card p-6">
      <h2 className="text-xl font-bold mb-4">Lab Results</h2>
      <p className="text-gray-600">Your lab results will appear here.</p>
    </div>
  );
}

function Appointments() {
  return (
    <div className="brutal-card p-6">
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
        cancel_at_period_end: true
      })
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="brutal-card p-6">
        <h2 className="text-xl font-bold mb-4">Active Subscriptions</h2>
        
        {subscriptions.length === 0 ? (
          <p className="text-gray-600">No active subscriptions.</p>
        ) : (
          subscriptions.map((sub: any) => (
            <div key={sub.id} className="border-2 border-black rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{sub.plan_type} Plan</h3>
                  <p className="text-gray-600">${sub.amount}/month • Billed quarterly</p>
                  <p className="text-sm text-gray-500">
                    Next billing: {formatDate(sub.current_period_end)}
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="text-emerald-600 text-sm font-bold hover:underline">Update Card</button>
                  <button 
                    onClick={() => cancelSubscription(sub.id)}
                    className="text-red-600 text-sm font-bold hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* HSA/FSA Info */}
        <div className="bg-emerald-50 rounded-lg p-4 mt-6 border-2 border-emerald-500">
          <h3 className="font-bold mb-2">HSA/FSA Eligible</h3>
          <p className="text-sm text-gray-600">
            Download your itemized receipt for reimbursement:
          </p>
          <button className="mt-2 text-emerald-600 text-sm font-bold hover:underline">
            Download Receipt →
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: string | undefined): string {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
}