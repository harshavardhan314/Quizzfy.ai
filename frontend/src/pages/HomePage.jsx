import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll logic for the drawing line
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("timeline-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const distance = windowHeight / 2 - rect.top;
        const totalHeight = rect.height;
        const percentage = Math.min(Math.max((distance / totalHeight) * 100, 0), 100);
        setScrollHeight(percentage);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    { title: "Step 1", description: "Pick a topic you want to assess yourself on and provide a prompt." },
    { title: "Step 2", description: "Select the difficulty level, number of questions, and set your timer." },
    { title: "Step 3", description: "Analyze your report, identify weak topics, and master them."},
  ];

  const faqs = [
    { q: "How does the AI generate questions?", a: "Our AI analyzes specific documentation and global datasets to create context-aware, challenging questions tailored to your topic." },
    { q: "Can I use it for professional certifications?", a: "Yes! Quzzify.ai supports everything from school exams to professional tech and medical certifications." },
    { q: "Is there a limit to how many tests I can take?", a: "Depending on your plan, you can generate multiple mock tests daily to ensure you're exam-ready." },
  ];

  return (
    <section className="relative min-h-screen bg-[#05060a] text-white">
      
      {/* Visible Dark Blue Grid Background */}
      <div className="fixed inset-0 -z-20 opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[linear-gradient(to_right,#1e40af_1px,transparent_1px),linear-gradient(to_bottom,#1e40af_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-black via-[#050b1a] to-[#06072fd9]" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-bold tracking-wide">
          Quzzify<span className="text-blue-500">.ai</span>
        </h1>
        <button className="rounded-lg border border-blue-500/30 px-4 py-2 text-sm text-blue-400 backdrop-blur hover:bg-blue-500/10 transition-all">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold leading-tight">
          Train harder here,
          <span className="block text-blue-500">so the exam feels easier...</span>
        </h1>
        <p className="mt-8 max-w-xl text-slate-400 text-lg">
          Quzzify.ai creates challenging AI-powered mock tests from any topic to prepare you for real exams.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-600/40 hover:bg-blue-500 transition-all">
            Start Practicing
          </button>
          <button className="rounded-xl border border-white/10 px-8 py-4 font-medium text-white backdrop-blur hover:bg-white/5 transition-all">
            Know more
          </button>
        </div>
      </div>

      {/* How it Works Section with Animation Line */}
      <div id="timeline-section" className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-center text-5xl md:text-7xl font-bold mb-32 text-blue-500">
          How it works
        </h2>

        <div className="relative">
          {/* Static Track */}
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/10 hidden md:block"></div>
          
          {/* Animated Blue Line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hidden md:block transition-all duration-200"
            style={{ height: `${scrollHeight}%` }}
          ></div>

          <div className="space-y-32">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="w-full md:w-[45%]">
                  <div className="p-10 rounded-3xl border-2 border-blue-500/50 bg-blue-500/5 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <h3 className="text-3xl font-bold text-blue-400 mb-4">{step.title}</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#05060a] border-2 border-white/20 items-center justify-center z-10 transition-colors duration-500"
                  style={{ 
                    borderColor: scrollHeight > (index * 33) + 10 ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                    boxShadow: scrollHeight > (index * 33) + 10 ? '0 0 15px rgba(59,130,246,0.5)' : 'none'
                  }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${scrollHeight > (index * 33) + 10 ? 'bg-blue-500' : 'bg-white/20'}`}></div>
                </div>
                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
          Frequently Asked <span className="text-blue-500">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-all"
              >
                <span className="text-lg font-bold">{faq.q}</span>
                <span className={`text-blue-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Quzzify<span className="text-blue-500">.ai</span></h2>
            <p className="text-slate-400 max-w-sm mb-6">Empowering students and professionals with AI-driven testing environments. Practice with purpose.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="hover:text-blue-500 cursor-pointer">Terms of Service</li>
              <li className="hover:text-blue-500 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Socials</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="hover:text-blue-500 cursor-pointer">Twitter</li>
              <li className="hover:text-blue-500 cursor-pointer">LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-20 text-slate-600 text-sm">
          © 2026 Quzzify.ai. All rights reserved.
        </div>
      </footer>
    </section>
  );
};

export default HomePage;