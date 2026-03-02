import React from 'react';
import { FiGrid, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // In a real app, parse this from localStorage.getItem('user')
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: "User Name",
    email: "user@example.com",
  };

  const handleLogout = () => {
    // Clear local storage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-zinc-900 p-6 hidden lg:flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">Quizzfy.ai</h1>
        <nav className="space-y-2">
          <NavItem icon={<FiGrid size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} />
          <NavItem icon={<FiUser size={18}/>} label="My Profile" active />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-md bg-[#0a0a0a] border border-zinc-900 p-10 rounded-[2.5rem] text-center shadow-2xl">
          {/* Avatar Icon */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/10">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* User Details */}
          <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
          <p className="text-zinc-500 mb-8">{user.email}</p>

          <hr className="border-zinc-900 mb-8" />

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-red-950/30 hover:text-red-500 hover:border-red-900/50 text-white font-bold py-4 rounded-2xl border border-zinc-800 transition-all duration-200"
            >
              <FiLogOut /> Logout Account
            </button>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full text-zinc-500 hover:text-zinc-300 text-sm font-semibold transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

// Reusable Sub-component (Fixed with onClick)
const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
    }`}
  >
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

export default ProfilePage;