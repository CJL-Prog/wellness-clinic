'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ProviderDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    revenue: 0
  });

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    setAssessments([
      {
        id: '1',
        user_email: 'patient1@example.com',
        created_at: new Date().toISOString(),
        goals: ['weight_loss', 'energy'],
        status: 'paid_awaiting_review'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <button
            onClick={() => {
              const supabase = createClientComponentClient();
              supabase.auth.signOut();
            }}
            className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="brutal-card p-6">
            <h3 className="text-gray-600 text-sm font-bold">Pending Reviews</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div className="brutal-card p-6">
            <h3 className="text-gray-600 text-sm font-bold">Approved Today</h3>
            <p className="text-3xl font-bold text-emerald-600">{stats.approved}</p>
          </div>
          <div className="brutal-card p-6">
            <h3 className="text-gray-600 text-sm font-bold">Monthly Revenue</h3>
            <p className="text-3xl font-bold">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Pending Assessments */}
        <div className="brutal-card">
          <div className="p-6 border-b-2 border-black">
            <h2 className="text-xl font-bold">Assessments Awaiting Review</h2>
          </div>
          <div className="divide-y-2 divide-black">
            {assessments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No pending assessments
              </div>
            ) : (
              assessments.map(assessment => (
                <div key={assessment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{assessment.user_email}</p>
                      <p className="text-sm text-gray-600">
                        Goals: {assessment.goals.join(', ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(assessment.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/provider/review/${assessment.id}`}
                      className="brutal-button"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            📊 Analytics
          </button>
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            💊 Prescriptions
          </button>
          <button className="brutal-card p-4 text-center hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
            📅 Schedule
          </button>
        </div>
      </div>
    </div>
  );
}