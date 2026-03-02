import React, { useMemo } from 'react';
import { FiBookOpen, FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  /* ---------------- USER DATA ---------------- */
  const user =
    JSON.parse(localStorage.getItem('user')) || {
      name: 'Alex Johnson',
      email: 'alex.dev@quizzfy.ai',
    };

  /* ---------------- PIE CHART DATA ---------------- */
  const conceptData = [
    { name: 'React', value: 45, color: '#3b82f6' },
    { name: 'Node.js', value: 25, color: '#22c55e' },
    { name: 'Python', value: 20, color: '#eab308' },
    { name: 'AI/ML', value: 10, color: '#ec4899' },
  ];

  /* ---------------- HEATMAP DATA ---------------- */
  const currentYear = 2026;
  const startDate = new Date(`${currentYear}-01-01`);
  const endDate = new Date(`${currentYear}-12-31`);

  const activityData = useMemo(
    () => [
      { date: '2026-01-05', count: 1 },
      { date: '2026-01-12', count: 3 },
      { date: '2026-02-01', count: 2 },
      { date: '2026-02-14', count: 4 },
      { date: '2026-02-21', count: 2 },
    ],
    []
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-400 font-sans">
      
      {/* ================= MAIN CONTENT ================= */}
      {/* ✅ CENTER FIX APPLIED HERE */}
      <main className="flex-1 p-6 lg:p-10 flex justify-center">
        <div className="w-full max-w-5xl space-y-6">

          {/* ---------- TOP SECTION ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* USER CARD */}
            <div className="md:col-span-1 bg-[#0a0a0a] border border-zinc-900 p-8 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-blue-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                {user.name}
              </h2>

              <p className="text-zinc-500 text-sm mb-6">{user.email}</p>

              <div className="w-full pt-6 border-t border-zinc-900 flex justify-around">
                <div>
                  <p className="text-white font-bold text-xl">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                    Quizzes
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">85%</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                    Avg Score
                  </p>
                </div>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="md:col-span-2 bg-[#0a0a0a] border border-zinc-900 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                <FiBookOpen className="text-blue-500" />
                Knowledge Mastery
              </h3>

              <div className="flex-1 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conceptData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {conceptData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </Pie>

                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#0a0a0a',
                        border: '1px solid #27272a',
                        borderRadius: '12px',
                      }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {conceptData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-zinc-400">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- HEATMAP ---------- */}
          <div className="bg-[#0a0a0a] border border-zinc-900 p-8 rounded-[2.5rem] shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FiActivity className="text-cyan-400" />
                  Activity Heatmap 2026
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Track your consistency across the entire year.
                </p>
              </div>
            </div>

            <div className="heatmap-container overflow-x-auto pb-4">
              <div className="min-w-[750px]">
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={endDate}
                  values={activityData}
                  gutterSize={3}
                  classForValue={(value) => {
                    if (!value) return 'color-empty';
                    return `color-scale-${Math.min(value.count, 4)}`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= CUSTOM CSS ================= */}
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #121212; }
        .react-calendar-heatmap .color-scale-1 { fill: #1e3a8a; }
        .react-calendar-heatmap .color-scale-2 { fill: #2563eb; }
        .react-calendar-heatmap .color-scale-3 { fill: #3b82f6; }
        .react-calendar-heatmap .color-scale-4 { fill: #60a5fa; }

        .react-calendar-heatmap rect {
          rx: 2;
          ry: 2;
          transition: all 0.2s ease;
        }

        .react-calendar-heatmap rect:hover {
          fill: #fff;
          cursor: pointer;
        }

        .react-calendar-heatmap-month-label,
        .react-calendar-heatmap-weekday-label {
          font-size: 9px;
          fill: #52525b;
          font-weight: 500;
        }

        .heatmap-container::-webkit-scrollbar {
          height: 4px;
        }

        .heatmap-container::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;