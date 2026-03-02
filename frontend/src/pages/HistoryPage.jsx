import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiGrid,
  FiActivity,
  FiUser,
  FiClock,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [viewingId, setViewingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quiz/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 font-sans">
      
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-zinc-900 p-6 hidden lg:flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent mb-10">
          Quizzfy.ai
        </h1>

        <nav className="space-y-2">
          <NavItem
            icon={<FiGrid size={18} />}
            label="Dashboard"
            active={isActive("/dashboard")}
            onClick={() => navigate("/dashboard")}
          />
          <NavItem
            icon={<FiActivity size={18} />}
            label="History"
            active={isActive("/history")}
            onClick={() => navigate("/history")}
          />
          <NavItem
            icon={<FiUser size={18} />}
            label="My Profile"
            active={isActive("/profile")}
            onClick={() => navigate("/profile")}
          />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">

        <header className="mb-10">
          <h2 className="text-2xl font-bold text-white">Quiz History</h2>
          <p className="text-zinc-600 text-sm mt-1">
            Review your previous quiz attempts.
          </p>
        </header>

        {history.length > 0 ? (
          <div className="space-y-6">
            {history.map((quiz, index) => {
              const percentage = Math.round(
                (quiz.score / quiz.totalQuestions) * 100
              );

              const isViewing = viewingId === quiz._id;

              return (
                <div
                  key={quiz._id}
                  className="bg-[#080808] border border-zinc-900 rounded-[24px] p-6 hover:border-zinc-700 transition-all"
                >
                  {/* TOP SECTION */}
                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center">
                        <span className="text-white font-black text-sm">
                          {percentage}%
                        </span>
                      </div>

                      <div>
                        <h4 className="text-white font-bold text-lg">
                          Test {index + 1}
                        </h4>
                        <p className="text-sm text-zinc-500 mt-1">
                          {quiz.topic} • {quiz.difficulty}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-bold uppercase mt-1">
                          <FiClock />
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">

                      <div className="text-right">
                        <p className="text-white font-black text-xl">
                          {quiz.score}
                          <span className="text-zinc-700">
                            /{quiz.totalQuestions}
                          </span>
                        </p>
                        <p className="text-[9px] text-zinc-600 uppercase font-black">
                          Score
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setViewingId(isViewing ? null : quiz._id)
                        }
                        className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
                      >
                        {isViewing ? "Close" : "View Test"}
                      </button>
                    </div>
                  </div>

                  {/* BLUE PROGRESS BAR */}
                  <div className="mt-6">
                    <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          percentage < 40
                            ? "bg-red-500"
                            : percentage < 70
                            ? "bg-yellow-500"
                            : "bg-gradient-to-r from-blue-600 to-cyan-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-blue-400 font-bold mt-1">
                      {percentage}% Performance
                    </p>
                  </div>

                  {/* VIEW TEST DETAILS */}
                  {isViewing && (
                    <div className="mt-8 border-t border-zinc-900 pt-6 space-y-6">

                      {/* QUESTIONS */}
                      <div>
                        <h3 className="text-white font-semibold mb-4">
                          Attempted Questions
                        </h3>

                        <div className="space-y-4">
                          {quiz.quizData.map((q, i) => {
                            const userAnswer = quiz.userAnswers[i];
                            const isCorrect = userAnswer === q.answer;

                            return (
                              <div
                                key={i}
                                className="bg-black border border-zinc-900 rounded-xl p-4"
                              >
                                <p className="text-white font-medium">
                                  Q{i + 1}. {q.question}
                                </p>

                                <p
                                  className={`mt-2 text-sm ${
                                    isCorrect
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  Your Answer: {userAnswer || "Skipped"}
                                </p>

                                {!isCorrect && (
                                  <p className="text-green-400 text-sm">
                                    Correct Answer: {q.answer}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* AI FEEDBACK */}
                      <div>
                        <h3 className="text-white font-semibold mb-4">
                          AI Feedback
                        </h3>

                        <div className="bg-black border border-zinc-900 rounded-xl p-5 space-y-3 text-sm">
                          <p>
                            <span className="text-white font-semibold">
                              Overall:
                            </span>{" "}
                            {quiz.aiFeedback?.overallPerformance}
                          </p>

                          <p>
                            <span className="text-white font-semibold">
                              Areas to Improve:
                            </span>{" "}
                            {quiz.aiFeedback?.areasToImprove?.join(", ")}
                          </p>

                          <p>
                            <span className="text-white font-semibold">
                              Action Plan:
                            </span>{" "}
                            {quiz.aiFeedback?.actionPlan?.join(", ")}
                          </p>

                          <p className="text-blue-400 font-medium">
                            {quiz.aiFeedback?.encouragement}
                          </p>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border border-dashed border-zinc-900 rounded-[40px]">
            <h2 className="text-xl font-bold text-zinc-500 mb-2">
              No Quiz History Found
            </h2>
            <p className="text-sm text-zinc-600">
              Start a quiz from dashboard to see it here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
      active
        ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </div>
);

export default HistoryPage;