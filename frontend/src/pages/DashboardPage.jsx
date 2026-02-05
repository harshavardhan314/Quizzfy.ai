import React, { useState } from 'react';
import { FiGrid, FiBookOpen, FiCalendar, FiUsers, FiSettings, FiSearch, FiPlus, FiClock, FiX } from 'react-icons/fi';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  // State to control the visibility of the "Create Quiz" Pop-up
  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
  const navigate=useNavigate();

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans selection:bg-blue-500/30">
      
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-[#050505] border-r border-zinc-900 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Quizzfy.ai
          </h1>
        </div>

        <nav className="space-y-1.5 flex-1">
          <NavItem icon={<FiGrid size={18}/>} label="Dashboard" active />
          <NavItem icon={<FiBookOpen size={18}/>} label="Quizzes" />
          <NavItem icon={<FiCalendar size={18}/>} label="Events" />
          <NavItem icon={<FiUsers size={18}/>} label="Students" />
        </nav>

        <div className="pt-6 border-t border-zinc-900">
          <NavItem icon={<FiSettings size={18}/>} label="Settings" />
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <FiSearch className="absolute left-3 top-3 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-600 transition-all text-zinc-200"
            />
          </div>
          
          {/* Create Button: Toggles state to true */}
          <button 
            onClick={() => setIsQuizPopupOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/10 transition-all active:scale-95"
          >
            <FiPlus size={20} /> Create New Quiz
          </button>
        </header>

        <section className="mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h2>
          <p className="text-zinc-500 mt-1 font-medium">Welcome back, Harsha.</p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard title="Total Quizzes" value="2,543" trend="+12%" icon={<FiBookOpen className="text-blue-500"/>} />
          <StatCard title="Active Events" value="1,120" trend="+8%" icon={<FiCalendar className="text-cyan-400"/>} />
          <StatCard title="Students" value="15,890" trend="+14%" icon={<FiUsers className="text-blue-500"/>} />
          <StatCard title="Avg. Score" value="88%" trend="-2%" icon={<HiOutlineTrophy className="text-cyan-400"/>} isNegative />
        </div>

        {/* List Section */}
        <div className="bg-[#0a0a0a] rounded-2xl p-7 border border-zinc-900 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">View All</button>
          </div>
          <div className="space-y-4">
             <EventItem title="Science Mid-term Quiz" date="Started 2h ago" status="Live" />
             <EventItem title="React Hooks Masterclass" date="Starts Tomorrow" status="Scheduled" />
          </div>
        </div>

        {/* --- POP-UP MODAL --- */}
        {isQuizPopupOpen && (
          <div className="fixed inset-0  flex items-center justify-center p-4">
            {/* Background Overlay with Blur */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setIsQuizPopupOpen(false)}
            />

            {/* Modal Card */}
            <div className="relative bg-[#0a0a0a] border border-zinc-800 w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden">
              {/* Close Icon */}
              <button 
                onClick={() => setIsQuizPopupOpen(false)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">Configure Quiz</h3>
              <p className="text-zinc-500 text-sm mb-6 font-medium">Set your parameters for the AI engine.</p>

              <div className="space-y-5">
                {/* Topic */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">Topic</label>
                  <input type="text" placeholder="e.g. Quantum Physics" className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>

                {/* Difficulty & Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">Difficulty</label>
                    <select className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:border-blue-500 appearance-none">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">Questions</label>
                    <input type="number" defaultValue="10" className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                {/* Timer */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">Time Limit (Minutes)</label>
                  <input type="number" defaultValue="15" className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:border-blue-500" />
                </div>

                {/* Submit Action */}
                <button 
                  onClick={() =>navigate('/test')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                  Generate Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Sub-Components ---

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
    active 
    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.05)]' 
    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
  }`}>
    {icon}
    <span className="font-bold text-sm tracking-wide">{label}</span>
  </div>
);

const StatCard = ({ title, value, trend, icon, isNegative }) => (
  <div className="bg-[#080808] p-6 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-colors">{icon}</div>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
        isNegative ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
      }`}>{trend}</span>
    </div>
    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{title}</p>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </div>
);

const EventItem = ({ title, date, status }) => (
  <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-zinc-900 hover:border-blue-600/30 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-[#0a0a0a] rounded-full flex items-center justify-center text-blue-500 border border-zinc-800 group-hover:scale-110 transition-transform">
        <FiClock size={18} />
      </div>
      <div>
        <h4 className="font-bold text-zinc-200 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-xs text-zinc-600">{date}</p>
      </div>
    </div>
    <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${
        status === 'Live' ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]' : 'bg-zinc-800 text-zinc-500'
      }`}>
        {status}
    </span>
  </div>
);

export default DashboardPage;