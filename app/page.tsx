import Link from 'next/link';
import Header from '@/components/Header';
import InteractiveHeroDemo from '@/components/InteractiveHeroDemo';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-in fade-in duration-500">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider w-fit mx-auto lg:mx-0">
                Bridging the Coding Gap
              </span>
              <h1 className="text-5xl sm:text-6xl font-black text-primary leading-tight tracking-tight">
                Automated Grading <br />
                <span className="text-blue-400">Human Oversight.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Reduce manual grading workload by <strong>80%</strong>. Domrov integrates assignment management, secure code execution, and AI-driven feedback into one unified platform for Cambodia.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/pricing"
                  className="btn-primary shadow-primary"
                >
                  Start Teaching Free
                </Link>
                <Link
                  href="/docs"
                  className="btn-outline"
                >
                  How it Works
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <InteractiveHeroDemo />
            </div>
          </div>
        </section>

        {/* Problem / Solution Section */}
        <section className="py-20 sm:py-28 bg-primary-light/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-primary text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                The Challenge and The Solution
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'hourglass_empty',
                  title: 'Manual Grading Overhead',
                  desc: 'Instructors spend countless hours manually grading code, leading to slow feedback and burnout.'
                },
                {
                  icon: 'bolt',
                  title: 'Automated Evaluation',
                  desc: 'Domrov LMS provides instant, consistent, and automated evaluation for programming assignments.'
                },
                {
                  icon: 'trending_up',
                  title: 'Improved Outcomes',
                  desc: 'Save valuable time, provide immediate feedback, and enhance student learning and satisfaction.'
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 rounded-lg bg-white p-6 border border-blue-200 shadow-lg hover:shadow-2xl transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-primary text-xl font-bold leading-tight">{item.title}</h3>
                    <p className="text-slate-600 text-base leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col gap-6 mb-12 max-w-3xl">
              <h2 className="text-primary text-3xl sm:text-4xl font-bold leading-tight tracking-tight">Core Features</h2>
              <p className="text-slate-600 text-lg sm:text-xl leading-normal">
                Discover the powerful tools that make Domrov the ultimate LMS for programming education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'terminal',
                  title: 'Automated Code Grading',
                  desc: 'Run student submissions against predefined test cases automatically.'
                },
                {
                  icon: 'rate_review',
                  title: 'Instant Feedback',
                  desc: 'Provide students with immediate, detailed feedback on their code.'
                },
                {
                  icon: 'shield',
                  title: 'Plagiarism Detection',
                  desc: 'Ensure academic integrity with robust plagiarism detection tools.'
                },
                {
                  icon: 'analytics',
                  title: 'Performance Analytics',
                  desc: 'Track student progress and identify improvement areas.'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-lg border border-blue-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-primary text-lg font-bold">{item.title}</h3>
                    <p className="text-slate-600 text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 sm:py-28 bg-primary-light/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-16">
              <h2 className="text-primary text-3xl sm:text-4xl font-bold leading-tight tracking-tight">How It Works</h2>
              <p className="text-slate-600 text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
                A simple 3-step process to streamline your workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-blue-200 hidden md:block"></div>

              {[
                {
                  num: '1',
                  title: 'Create an Assignment',
                  desc: 'Easily set up programming tasks with custom test cases.'
                },
                {
                  num: '2',
                  title: 'Students Submit Code',
                  desc: 'Students write and submit solutions directly through the platform.'
                },
                {
                  num: '3',
                  title: 'Get Instant Results',
                  desc: 'Code is automatically graded with instant, actionable feedback.'
                }
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary text-2xl font-bold mb-6 border-2 border-blue-300">
                    {step.num}
                  </div>
                  <h3 className="text-primary text-xl font-bold leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 max-w-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Built for the Cambodian Context</h2>
            <p className="text-blue-200 text-lg mb-8">
              Low-bandwidth optimization, Bakong payment integration, and localized support.
            </p>
            <Link
              href="/pricing"
              className="bg-white text-primary font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-colors shadow-xl inline-block"
            >
              View Token Plans
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
