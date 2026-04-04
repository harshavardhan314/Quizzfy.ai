import React, { useState } from 'react';
import { FiGrid, FiUser, FiLogOut, FiPlus, FiX, FiBook, FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || {
    name: "harsha",
    email: "h@gmail.com",
  };

  // Mock data for the Donut Chart
  const masteryData = [
    { name: 'React', value: 45, color: '#3b82f6' },
    { name: 'Node.js', value: 25, color: '#22c55e' },
    { name: 'Python', value: 20, color: '#eab308' },
    { name: 'AI/ML', value: 10, color: '#ec4899' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-900 p-6 hidden lg:flex flex-col">
        <h1 className="text-2xl font-bold text-blue-500 mb-10 px-4">Quizzfy.ai</h1>
        <nav className="flex-1 space-y-2">
          <NavItem icon={<FiGrid size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} />
          <NavItem icon={<FiUser size={18}/>} label="My Profile" active />
          
          <div className="pt-4 mt-4 border-t border-zinc-900">
            <button 
              onClick={() => setIsQuizPopupOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-500 hover:text-white"
            >
              <FiPlus size={20} />
              <span className="font-bold text-sm">Create Quiz</span>
            </button>
          </div>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-all">
          <FiLogOut size={18}/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Top Row: Profile & Mastery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Profile Card */}
            <div className="lg:col-span-4 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-2xl shadow-blue-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-zinc-500 mb-8">{user.email}</p>
              
              <div className="w-full h-px bg-zinc-900 mb-8" />
              
              <div className="flex justify-around w-full">
                <div>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Quizzes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Avg Score</p>
                </div>
              </div>
            </div>

            {/* Knowledge Mastery Chart */}
            <div className="lg:col-span-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] p-8">
              <div className="flex items-center gap-2 mb-4">
                <FiBook className="text-blue-500" />
                <h3 className="text-lg font-bold text-white">Knowledge Mastery</h3>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between h-64">
                <div className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={masteryData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {masteryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full px-4">
                  {masteryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium text-zinc-500">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Activity Heatmap */}
          <div className="bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <FiActivity className="text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Activity Heatmap 2026</h3>
                  <p className="text-xs text-zinc-600">Track your consistency across the entire year.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-600">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-zinc-900 rounded-sm" />
                  <div className="w-3 h-3 bg-blue-900 rounded-sm" />
                  <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-1 text-[10px] text-zinc-600 mb-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <div key={m} className="flex-1 min-w-[40px]">{m}</div>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {Array.from({ length: 364 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-sm ${
                      [5, 12, 45, 48].includes(i) ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-[#121212]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Quiz Popup code remains the same as previous response */}
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
    }`}
  >
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

export default ProfilePage;