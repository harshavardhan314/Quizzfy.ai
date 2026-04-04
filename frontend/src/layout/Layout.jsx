import React from 'react';
import { FiGrid, FiUser, FiLogOut, FiPlus } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ onCreateClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-[#050505] border-r border-zinc-900 p-5 hidden lg:flex flex-col sticky top-0 h-screen">
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-8 px-2">
        Quizzfy.ai
      </h1>
      
      <nav className="space-y-1.5 flex-1">
        <NavItem 
          icon={<FiGrid size={16}/>} 
          label="Dashboard" 
          active={location.pathname === '/dashboard'} 
          onClick={() => navigate('/dashboard')} 
        />
        
        {/* Action Button inside Sidebar */}
        <NavItem 
          icon={<FiPlus size={16}/>} 
          label="Create Quiz" 
          isAction 
          onClick={onCreateClick} 
        />

        <NavItem 
          icon={<FiUser size={16}/>} 
          label="Profile" 
          active={location.pathname === '/profile'} 
          onClick={() => navigate('/profile')} 
        />
      </nav>

      <div className="mt-auto">
        <div className="mb-4 px-3 py-2 bg-blue-600/5 border border-blue-600/10 rounded-xl">
          <p className="text-[10px] uppercase tracking-widest text-blue-500 font-black">Pro Plan</p>
          <p className="text-[11px] text-zinc-500">Unlimited AI Credits</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 px-3 py-2.5 w-full text-zinc-600 hover:text-white transition-all font-semibold text-xs border-t border-zinc-900"
        >
          <FiLogOut size={16}/> Sign Out
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false, isAction = false, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
      ${active 
        ? 'bg-blue-600/10 text-blue-400 border border-blue-600/10 shadow-sm shadow-blue-500/5' 
        : isAction 
          ? 'text-white bg-white/5 hover:bg-white/10 mt-3 border border-white/5' 
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
      }`}
  >
    {icon} <span className="font-bold text-[13px] tracking-tight">{label}</span>
  </div>
);

export default Layout;