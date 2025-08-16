'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HealthJournal() {
  const [activeTab, setActiveTab] = useState('entries');
  
  // Mock data for demo
  const journalEntries = [
    {
      id: 1,
      date: '2024-01-15',
      mood: 'Good',
      energy: 8,
      sleep: 7,
      symptoms: ['Mild fatigue'],
      notes: 'Feeling better after starting new protocol'
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 'Fair',
      energy: 6,
      sleep: 6,
      symptoms: ['Fatigue', 'Brain fog'],
      notes: 'Need to improve sleep schedule'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text-hero">Health Journal</h1>
          <p className="text-gray-600">Track your progress and symptoms over time</p>
        </div>

        {/* Tabs */}
        <div className="brutal-card mb-6">
          <div className="border-b-2 border-black">
            <div className="flex space-x-8 px-6">
              {['entries', 'trends', 'add'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 capitalize border-b-4 transition-colors font-bold ${
                    activeTab === tab 
                      ? 'border-emerald-500 text-emerald-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'add' ? 'New Entry' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="brutal-card p-6">
          {activeTab === 'entries' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Recent Entries</h2>
              {journalEntries.map(entry => (
                <div key={entry.id} className="border-2 border-black rounded-lg p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <span className="text-sm text-gray-500 font-bold">Mood: {entry.mood}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Energy: </span>
                      <span className="font-bold">{entry.energy}/10</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Sleep: </span>
                      <span className="font-bold">{entry.sleep} hours</span>
                    </div>
                  </div>
                  {entry.symptoms.length > 0 && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Symptoms: </span>
                      {entry.symptoms.map((symptom, i) => (
                        <span key={i} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2 font-bold border-2 border-yellow-800">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700">{entry.notes}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trends' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Health Trends</h2>
              <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-black">
                <p className="text-gray-600">Trend charts will appear here as you add more entries</p>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="mt-4 brutal-button"
                >
                  Add Your First Entry
                </button>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div>
              <h2 className="text-xl font-bold mb-4">New Journal Entry</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Overall Mood
                    </label>
                    <select className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Energy Level (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Hours of Sleep
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="How are you feeling today? Any symptoms or improvements?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="brutal-button"
                >
                  Save Entry
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}