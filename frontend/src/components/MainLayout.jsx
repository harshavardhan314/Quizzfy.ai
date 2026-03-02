import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiUser, FiClock, FiLogOut } from 'react-icons/fi';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FiGrid />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FiClock />, label: 'History', path: '/history' },
    { icon: <FiUser />, label: 'Profile', path: '/profile' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-black text-zinc-400 overflow-hidden">
      {/* PERSISTENT SIDEBAR - Fixed Width, No Gap */}
      <aside className="w-64 bg-[#050505] border-r border-zinc-900 p-6 flex flex-col shrink-0">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">
          Quizzfy.ai
        </h1>
        
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <div 
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                location.pathname === item.path 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              {item.icon} <span className="font-bold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-red-400 transition-colors mt-auto border-t border-zinc-900 pt-4"
        >
          <FiLogOut /> <span className="font-bold text-sm">Sign Out</span>
        </button>
      </aside>

      {/* DYNAMIC CONTENT - Independent Scroll */}
      <main className="flex-1 overflow-y-auto bg-black scrollbar-hide">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;