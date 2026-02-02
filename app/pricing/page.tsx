import React from 'react';
import Header from '@/components/Header';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-primary mb-6">Flexible &quot;Token-Based&quot; Pricing</h1>
          <p className="text-xl text-slate-600">
            Pay only for what you use. No subscriptions. <br />
            <span className="text-sm font-bold text-accent">We accept Bakong KHQR.</span>
          </p>
        </div>

        {/* Pricing Order: Free → Starter → Wallet → University */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-lg font-bold text-slate-500 mb-2">Basic</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-primary">Free</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">For individual learners and trial teachers.</p>
            <button className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary-light transition-colors mb-8">
              Start Free
            </button>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Manual Grading</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> 1 Active Class</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> 50MB Storage</li>
            </ul>
          </div>

          {/* $1 Starter Pack */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-lg font-bold text-slate-500 mb-2">Starter Pack</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-primary">$1</span>
              <span className="text-slate-400 text-sm font-medium">/ 2000 tokens</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">Perfect for students or small testing sessions.</p>
            <button className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary-light transition-colors mb-8">
              Buy with Bakong KHQR
            </button>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> AI Feedback</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Automated Code Hints</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Small Assignments</li>
            </ul>
          </div>

          {/* Main Wallet */}
          <div className="bg-primary rounded-2xl p-8 shadow-2xl relative transform md:-translate-y-6 hover:scale-[1.02] transition-all">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Best Value
            </div>
            <h3 className="text-lg font-bold text-blue-200 mb-2">Token Wallet</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-white">$10</span>
              <span className="text-slate-200 text-sm font-medium">/ 100,000 tokens</span>
            </div>
            <p className="text-blue-100 mb-8 text-sm">Ideal for teachers and mid-size classes. Tokens never expire.</p>
            <button className="w-full py-3 px-4 rounded-lg bg-white text-primary font-bold hover:bg-blue-50 transition-colors mb-8 shadow-lg">
              Buy with Bakong KHQR
            </button>
            <ul className="space-y-4 text-sm text-white">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-300">check_circle</span> AI Code Analysis</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-300">check_circle</span> Auto-Hint Generation</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-300">check_circle</span> Code Optimization</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-300">check_circle</span> Usage Dashboard</li>
            </ul>
          </div>

          {/* University Tier */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-lg font-bold text-slate-500 mb-2">University</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-primary">BYOK</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">Bring Your Own OpenAI Key. Platform-only fee.</p>
            <button className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary-light transition-colors mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Unlimited Classes</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Admin Dashboard</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-green-500">check_circle</span> Use Your Own OpenAI Key</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
