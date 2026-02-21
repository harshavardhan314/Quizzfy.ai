import React, { useState } from 'react';
import { FiGrid, FiBookOpen, FiPlus, FiX, FiClock, FiSearch, FiUser } from 'react-icons/fi';
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
        body: JSON.stringify({  
          topic: formData.topic, 
          difficulty: formData.difficulty, 
          count: formData.count 
        })
      });

      const data = await res.json();
      
      // Navigate to test page with the generated data
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">Quizzfy.ai</h1>
        
        <nav className="space-y-2">
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
           
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96">
            <FiSearch className="absolute left-3 top-3 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-blue-600 outline-none transition-all" 
            />
          </div>
          
          <div className='flex justify-center gap-4'>
            <button 
            onClick={() => setIsQuizPopupOpen(true)} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95"
            >
            <FiPlus size={20} /> Create New Quiz
          </button>

          <button 
            onClick={() => navigate('/profile')} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95"
            >
            <FiUser size={20} /> profile
          </button>

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
              
              <h3 className="text-2xl font-bold text-white mb-6">Quiz Settings</h3>

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
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Count</label>
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
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
              <FiBookOpen size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Quizzes Yet</h2>
            <p className="max-w-xs text-sm">Click the button above to generate your first AI-powered quiz.</p>
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
        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
      }
    `}
  >
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

export default DashboardPage;