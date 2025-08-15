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
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    // This would fetch from your API
    // const { data } = await supabase
    //   .from('assessments')
    //   .select('*')
    //   .eq('status', 'paid_awaiting_review')
    //   .order('created_at', { ascending: false });
    
    // For now, using mock data
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Pending Reviews</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Approved Today</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Monthly Revenue</h3>
            <p className="text-3xl font-bold">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Pending Assessments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Assessments Awaiting Review</h2>
          </div>
          <div className="divide-y">
            {assessments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No pending assessments
              </div>
            ) : (
              assessments.map(assessment => (
                <div key={assessment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{assessment.user_email}</p>
                      <p className="text-sm text-gray-600">
                        Goals: {assessment.goals.join(', ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(assessment.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/provider/review/${assessment.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
          <button className="p-4 bg-white rounded-lg shadow text-center hover:shadow-lg">
            📊 Analytics
          </button>
          <button className="p-4 bg-white rounded-lg shadow text-center hover:shadow-lg">
            💊 Prescriptions
          </button>
          <button className="p-4 bg-white rounded-lg shadow text-center hover:shadow-lg">
            📅 Schedule
          </button>
        </div>
      </div>
    </div>
  );
}