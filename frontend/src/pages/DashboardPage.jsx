import React, { useState } from 'react';
import { FiGrid, FiBookOpen, FiPlus, FiX, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: '',
    difficulty: 'Beginner',
    count: 5
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      navigate('/test', { state: { questions: data } });
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      alert("Error generating quiz. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-zinc-900 p-6 hidden lg:flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">
          Quizzfy.ai
        </h1>
        
        <nav className="flex-1 space-y-2">
          <NavItem 
            icon={<FiGrid size={18}/>} 
            label="Dashboard" 
            active 
          />
          <NavItem 
            icon={<FiUser size={18}/>} 
            label="My Profile" 
            onClick={() => navigate('/profile')} 
          />
          
          <div className="pt-4 mt-4 border-t border-zinc-900">
            <button 
              onClick={() => setIsQuizPopupOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95 group"
            >
              <FiPlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-bold text-sm">Create Quiz</span>
            </button>
          </div>
        </nav>

        {/* Optional Logout at bottom */}
        <div className="mt-auto">
           <NavItem icon={<FiLogOut size={18}/>} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <FiSearch className="absolute left-3 top-3 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Search your quizzes..." 
              className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-blue-600 outline-none transition-all" 
            />
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">Welcome back</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Student Account</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400">
                <FiUser size={20} />
             </div>
          </div>
        </header>

        {/* Quiz Setup Popup */}
        {isQuizPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0a0a0a] border border-zinc-800 w-full max-w-md p-8 rounded-3xl relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setIsQuizPopupOpen(false)} 
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">New Quiz</h3>
              <p className="text-sm text-zinc-500 mb-6">Configure your AI-generated assessment.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Topic</label>
                  <input 
                    type="text" 
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none mt-1" 
                    placeholder="e.g. Modern Architecture"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Difficulty</label>
                    <select 
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white outline-none mt-1"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Questions</label>
                    <input 
                      type="number" 
                      min="1"
                      max="20"
                      value={formData.count}
                      onChange={(e) => setFormData({...formData, count: e.target.value})}
                      className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white outline-none mt-1" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading || !formData.topic}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "AI is generating..." : "Start Generation"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for Empty State */}
        {!quizData && !loading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-blue-500 shadow-lg shadow-blue-500/10">
              <FiBookOpen size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Ready to learn?</h2>
            <p className="max-w-xs text-sm text-zinc-500">Use the sidebar to create your first AI-powered quiz and test your knowledge.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${active 
        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-sm shadow-blue-500/5' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
      }
    `}
  >
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

export default DashboardPage;