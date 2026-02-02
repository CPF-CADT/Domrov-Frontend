import React from 'react';
import Header, { THEME } from '@/components/Header';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col animate-in fade-in duration-500">
      <Header />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 to-white border-b border-slate-200 py-16 px-4 text-center">
        <h1 className={`text-5xl font-black ${THEME.textMain} mb-4`}>Domrov User Guidelines</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Learn how to use Domrov effectively — for Students, Teachers, Admins, and Quiz Operators.
        </p>
      </section>

      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-12 px-4 sm:px-8 pt-8">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block col-span-3 border-r border-slate-200 h-[calc(100vh-6rem)] sticky top-24 bg-[#FAFCFF] overflow-y-auto p-4 rounded-lg shadow-sm">
          <nav className="space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">User Types</div>
              <ul className="space-y-1">
                <li className="px-3 py-2 text-sm font-medium text-[#003366] bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">person</span> Students</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">assignment_ind</span> Teachers</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">admin_panel_settings</span> Admins</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">quiz</span> Quiz Masters</li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-3">Platform Features</div>
              <ul className="space-y-1">
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">code</span> AI Code Analysis</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">lightbulb</span> AI Hints</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">folder</span> Submission Methods</li>
                <li className="px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 rounded-md flex items-center gap-2 cursor-pointer"><span className="material-symbols-outlined">workspace_premium</span> Token System</li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-12 lg:col-span-9 pl-0 lg:pl-12 py-4">
          <div className="max-w-3xl">

            {/* STUDENT GUIDE */}
            <section className="mb-20">
              <h2 className={`text-3xl font-black ${THEME.textMain} mb-4 flex items-center gap-2`}><span className="material-symbols-outlined text-3xl">person</span> Student Guide</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">Everything students need to know to submit assignments, receive feedback, and learn effectively.</p>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                  <h3 className="font-bold text-[#003366] mb-2">1. Dashboard</h3>
                  <p className="text-sm text-slate-600">Shows your enrolled classes, active assignments, deadlines, and grades.</p>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                  <h3 className="font-bold text-[#003366] mb-2">2. Submission Methods</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>GitHub Repository Sync</li>
                    <li>ZIP Upload for multi-file projects</li>
                    <li>Direct Code Paste for small tasks</li>
                  </ul>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm">
                  <h3 className="font-bold text-[#003366] mb-2">3. AI Helper</h3>
                  <p className="text-sm text-slate-600">The AI provides hints — never full solutions — to support learning.</p>
                </div>
              </div>
            </section>

            {/* TEACHER GUIDE */}
            <section className="mb-20 pt-10 border-t border-slate-200">
              <h2 className={`text-3xl font-black ${THEME.textMain} mb-4 flex items-center gap-2`}><span className="material-symbols-outlined text-3xl">assignment_ind</span> Teacher Guide</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">Tools for faster, more accurate, and transparent grading.</p>

              <div className="bg-[#F0F7FF] rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-[#003366] mb-4">Grading Workflow</h3>
                <ol className="relative border-l border-blue-200 ml-3 space-y-8">
                  <li className="pl-6 relative">
                    <span className="absolute -left-3 top-1 w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">1</span>
                    <h4 className="font-bold text-slate-800">Auto Evaluation</h4>
                    <p className="text-sm text-slate-600 mt-1">AI reviews logic, syntax, efficiency, and common mistakes.</p>
                  </li>

                  <li className="pl-6 relative">
                    <span className="absolute -left-3 top-1 w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
                    <h4 className="font-bold text-slate-800">Manual Review</h4>
                    <p className="text-sm text-slate-600 mt-1">Teachers approve, correct, or override AI recommendations.</p>
                  </li>

                  <li className="pl-6 relative">
                    <span className="absolute -left-3 top-1 w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
                    <h4 className="font-bold text-slate-800">Publish</h4>
                    <p className="text-sm text-slate-600 mt-1">Students receive graded results instantly.</p>
                  </li>
                </ol>
              </div>
            </section>

            {/* ADMIN GUIDE */}
            <section className="mb-20 pt-10 border-t border-slate-200">
              <h2 className={`text-3xl font-black ${THEME.textMain} mb-4 flex items-center gap-2`}><span className="material-symbols-outlined text-3xl">admin_panel_settings</span> Admin Guide</h2>
              <p className="text-slate-700 mb-6">Manage users, classes, permissions, storage, and platform monitoring.</p>

              <ul className="space-y-4">
                <li className="bg-white p-5 border rounded-xl shadow-sm">
                  <strong className="text-[#003366]">User Management</strong>
                  <p className="text-sm text-slate-600">Admins can create teachers, assign roles, or deactivate suspicious accounts.</p>
                </li>
                <li className="bg-white p-5 border rounded-xl shadow-sm">
                  <strong className="text-[#003366]">Storage Monitoring</strong>
                  <p className="text-sm text-slate-600">Track file uploads and prevent abuse.</p>
                </li>
                <li className="bg-white p-5 border rounded-xl shadow-sm">
                  <strong className="text-[#003366]">Analytics Dashboard</strong>
                  <p className="text-sm text-slate-600">See trending assignments, performance, and usage stats.</p>
                </li>
              </ul>
            </section>

            {/* QUIZ GUIDE */}
            <section className="mb-20 pt-10 border-t border-slate-200">
              <h2 className={`text-3xl font-black ${THEME.textMain} mb-4 flex items-center gap-2`}><span className="material-symbols-outlined text-3xl">quiz</span> Quiz Master Guide</h2>
              <p className="text-slate-700 mb-6">Conduct fair, real-time quizzes with anti-cheating features.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 border rounded-xl shadow-sm">
                  <strong className="text-[#003366]">Live Quizzes</strong>
                  <p className="text-sm text-slate-600">Run timed quizzes with real-time submission tracking.</p>
                </div>
                <div className="bg-white p-5 border rounded-xl shadow-sm">
                  <strong className="text-[#003366]">Anti-Cheating</strong>
                  <p className="text-sm text-slate-600">Browser lockdown and activity monitoring during exams.</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
