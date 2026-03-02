import React, { useState, useEffect } from "react";
import { 
  FiBookOpen, FiPlus, FiX, FiClock, FiSearch, 
  FiActivity, FiChevronRight 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Beginner",
    count: 5,
  });

  // Fetch History from API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quiz/history");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleGenerate = async () => {
    if (!formData.topic) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-quiz", formData);
      
      // Navigate to test page with data
      navigate("/test", {
        state: {
          questions: res.data,
          topic: formData.topic,
          difficulty: formData.difficulty,
        },
      });
    } catch (err) {
      console.error("Failed to generate quiz:", err);
      alert("Error generating quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input
            type="text"
            placeholder="Search your quizzes..."
            className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:border-blue-600/50 outline-none transition-all shadow-inner text-white"
          />
        </div>

        <button
          onClick={() => setIsQuizPopupOpen(true)}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <FiPlus size={20} /> Create New Quiz
        </button>
      </header>

      {/* RECENT ASSESSMENTS SECTION */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">
            Recent Assessments
          </h2>
          <div className="h-[1px] flex-1 bg-zinc-900"></div>
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {history.map((quiz) => (
              <div
                key={quiz._id}
                onClick={() => navigate(`/results`, { state: { quizId: quiz._id } })}
                className="group bg-[#080808] border border-zinc-900 p-6 rounded-[2rem] flex items-center justify-between hover:border-zinc-700 transition-all cursor-pointer hover:bg-[#0c0c0c]"
              >
                <div className="flex items-center gap-6">
                  {/* Score Indicator */}
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center group-hover:border-blue-500/40 transition-colors">
                    <span className="text-white font-black text-base">
                      {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                      {quiz.topic}
                    </h4>
                    <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-zinc-700" /> {new Date(quiz.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-blue-500/60">
                        <FiActivity /> {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-white font-black text-2xl leading-none">
                      {quiz.score}
                      <span className="text-zinc-800 text-lg">/{quiz.totalQuestions}</span>
                    </p>
                    <p className="text-[9px] text-zinc-700 uppercase font-black mt-1">Score</p>
                  </div>
                  <FiChevronRight className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh] text-center border border-dashed border-zinc-900 rounded-[3rem] bg-[#030303]/50">
            <FiBookOpen size={40} className="mb-6 text-zinc-800" />
            <h2 className="text-xl font-bold text-zinc-400 mb-2">Build Your First Quiz</h2>
            <p className="max-w-xs text-zinc-600 text-sm">Use the "Create New Quiz" button to start your journey.</p>
          </div>
        )}
      </section>

      {/* POPUP MODAL */}
      {isQuizPopupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-zinc-800 w-full max-w-md p-10 rounded-[2.5rem] relative">
            <button
              onClick={() => setIsQuizPopupOpen(false)}
              className="absolute top-8 right-8 text-zinc-600 hover:text-white"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-8">New Assessment</h3>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-500 outline-none"
                  placeholder="e.g. JavaScript Design Patterns"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 block">Questions</label>
                  <input
                    type="number"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !formData.topic}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl mt-4 disabled:opacity-30 transition-all shadow-lg"
              >
                {loading ? "AI is generating..." : "Generate Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;