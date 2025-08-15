'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProviderDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    denied: 0,
    revenue: 0
  });

  useEffect(() => {
    // Fetch pending assessments
    fetch('/api/assessments?status=paid_awaiting_review')
      .then(res => res.json())
      .then(data => setAssessments(data || []));
    
    // Fetch stats
    fetch('/api/provider/stats')
      .then(res => res.json())
      .then(data => setStats(data || stats));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Provider Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Approved Today</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Denied Today</h3>
            <p className="text-3xl font-bold text-red-600">{stats.denied}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">
              ${stats.revenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Pending Assessments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Assessments Awaiting Review</h2>
          </div>
          
          <div className="divide-y">
            {assessments.length === 0 ? (
              <p className="p-6 text-gray-500">No pending assessments</p>
            ) : (
              assessments.map((assessment) => (
                <div key={assessment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        Patient #{assessment.id.slice(0, 8)}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Goals: {assessment.goals?.join(', ')}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Submitted: {new Date(assessment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/provider/review/${assessment.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Review →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <span className="text-2xl mb-2 block">📊</span>
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-gray-600 text-sm mt-1">
              Patient outcomes and metrics
            </p>
          </button>
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <span className="text-2xl mb-2 block">💊</span>
            <h3 className="font-semibold">Protocol Library</h3>
            <p className="text-gray-600 text-sm mt-1">
              Treatment templates and guidelines
            </p>
          </button>
          <button className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <span className="text-2xl mb-2 block">📝</span>
            <h3 className="font-semibold">Compliance Docs</h3>
            <p className="text-gray-600 text-sm mt-1">
              DEA, state licenses, and policies
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}