import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const team = [
  { name: "Sat Panha", role: "CEO & Project Manager", desc: "Agile planning and vision." },
  { name: "Phy Vathanak", role: "Lead Developer", desc: "Backend architecture & DevOps." },
  { name: "Cheng Chanpanha", role: "Fullstack Developer", desc: "Backend logic & API maintenance." },
  { name: "Soveth Roathbunna", role: "QA Engineer", desc: "Testing & System Quality." },
  { name: "Chhun Sivheng", role: "UX/UI & Frontend", desc: "Interface design & usability." },
  { name: "Choun Ratanak", role: "Frontend Developer", desc: "UI Components & Logic." },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />

      {/* Vision Section */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-primary-light to-white">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_left,#80bfff,transparent_60%)]"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-accent font-bold uppercase tracking-wide text-sm mb-4 block">Our Vision</span>
            <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-6">Empowering Cambodian Students With Future-Ready Coding Skills</h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Domrov aims to become the first AI-driven educational tool built specifically for Cambodia—enabling schools to teach coding more efficiently, more accurately, and with modern standards.
            </p>
          </div>

          {/* Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-2xl transition-all">
              <span className="material-symbols-outlined text-accent text-5xl mb-4">lightbulb</span>
              <h3 className="font-bold text-xl mb-2">Innovation First</h3>
              <p className="text-slate-600 text-sm">Using AI to deliver real-time feedback and reduce teacher workload.</p>
            </div>

            <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-2xl transition-all">
              <span className="material-symbols-outlined text-accent text-5xl mb-4">school</span>
              <h3 className="font-bold text-xl mb-2">Better Learning</h3>
              <p className="text-slate-600 text-sm">Helping students grow through personalized, automated code assessment.</p>
            </div>

            <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-2xl transition-all">
              <span className="material-symbols-outlined text-accent text-5xl mb-4">public</span>
              <h3 className="font-bold text-xl mb-2">Future for Cambodia</h3>
              <p className="text-slate-600 text-sm">Building a stronger digital generation prepared for global opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <span className="text-accent font-bold uppercase tracking-wide text-sm mb-2 block">Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
            Addressing the Digital Divide in Cambodian Education.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We built Domrov to solve the &quot;Coding Gap&quot;—where teachers are overwhelmed by manual grading and students lack timely feedback.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="w-24 h-24 rounded-full bg-primary-light mb-6 mx-auto flex items-center justify-center text-primary shadow-md">
                  <span className="material-symbols-outlined text-4xl">person</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                  <span className="text-xs font-bold text-accent uppercase tracking-wide mb-3 block">{member.role}</span>
                  <p className="text-sm text-slate-500">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer variant="primary" />
    </div>
  );
}
