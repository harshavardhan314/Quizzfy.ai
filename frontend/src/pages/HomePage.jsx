import React from "react";

const HomePage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden ">

      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-bold text-white">
          quzzify<span className="text-blue-500">.ai</span>
        </h1>

        <button className="rounded-lg border border-blue-500/30 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10 transition">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex h-[calc(100vh-96px)] flex-col items-center justify-center px-6 text-center">

        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold text-white leading-tight">
          Train harder here,
          <span className="text-blue-500"> so the exam feels easier.</span>
        </h1>

        <p className="mt-6 max-w-xl text-slate-400 text-lg">
          quzzify.ai creates challenging AI-powered mock tests from any topic
          to prepare you for real exams.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition">
            Start Practicing
          </button>

          <button className="rounded-lg border border-white/10 px-6 py-3 text-white hover:bg-white/5 transition">
            How it Works
          </button>
        </div>
      </div>

      
      

    </section>
  );
};

export default HomePage;
