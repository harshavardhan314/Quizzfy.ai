import React from 'react';
import { FiGrid, FiActivity, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <FiGrid size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiActivity size={18} />, label: "History", path: "/history" },
    { icon: <FiUser size={18} />, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-zinc-900 p-6 flex flex-col z-50">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">
        Quizzfy.ai
      </h1>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            }`}
          >
            {item.icon} <span className="font-bold text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      <button 
        onClick={() => { localStorage.clear(); navigate('/login'); }}
        className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 transition-all mt-auto border-t border-zinc-900/50 pt-6"
      >
        <FiLogOut size={18}/> <span className="font-bold text-sm">Sign Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;