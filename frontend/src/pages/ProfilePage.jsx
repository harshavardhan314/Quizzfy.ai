import React from 'react';
import { FiGrid, FiUser, FiSettings, FiLogOut, FiAward, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this comes from your Auth context or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "February 2024",
    quizzesTaken: 24,
    avgScore: "85%",
    rank: "Quiz Master"
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans">
      {/* Sidebar - Consistent with Dashboard */}
      <aside className="w-64 bg-[#050505] border-r border-zinc-900 p-6 hidden lg:flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">Quizzfy.ai</h1>
        <NavItem icon={<FiGrid size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} />
        <NavItem icon={<FiUser size={18}/>} label="My Profile" active />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto w-full">
        
        {/* Header Profile Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-[#0a0a0a] border border-zinc-900 p-8 rounded-3xl">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-500/20">
            {user.name.charAt(0)}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-zinc-500 mb-4">{user.email}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {user.rank}
              </span>
              <span className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-400">
                Joined {user.joined}
              </span>
            </div>
          </div>
          <button className="bg-zinc-900 hover:bg-zinc-800 text-white p-3 rounded-xl border border-zinc-800 transition-all">
            <FiSettings size={20} />
          </button>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={<FiCheckCircle className="text-green-500" />} label="Quizzes Completed" value={user.quizzesTaken} />
          <StatCard icon={<FiAward className="text-yellow-500" />} label="Average Score" value={user.avgScore} />
          <StatCard icon={<FiClock className="text-blue-500" />} label="Study Hours" value="12.5h" />
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black border border-zinc-900 rounded-2xl hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-blue-400">
                    <FiGrid size={18} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Modern React Hooks Quiz</p>
                    <p className="text-xs text-zinc-600">Completed 2 days ago • Difficulty: Advanced</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold">9/10</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-12 flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors">
          <FiLogOut /> Logout
        </button>
      </main>
    </div>
  );
};

// Reusable Sub-components
const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
    }`}
  >
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#0a0a0a] border border-zinc-900 p-6 rounded-3xl">
    <div className="flex items-center gap-3 mb-4 text-zinc-500">
      {icon} <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
  </div>
);

export default ProfilePage;