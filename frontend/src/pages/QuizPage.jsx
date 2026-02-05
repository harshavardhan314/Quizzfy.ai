import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiCircle, FiChevronLeft, FiChevronRight, FiSend } from 'react-icons/fi';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. DATA INITIALIZATION
  const quizData = location.state?.questions || [];
  const quizTopic = location.state?.topic || "General Topic";

  // 2. STATE MANAGEMENT
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // Stores { index: "Selected Option" }
  const [timeLeft, setTimeLeft] = useState(quizData.length * 60); // 1 min per question
  const [isFinished, setIsFinished] = useState(false);

  // 3. TIMER EFFECT
  useEffect(() => {
    if (quizData.length === 0) return;
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizData.length]);

  // 4. HELPER FUNCTIONS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: selectedOption });
  };

  const calculateFinalScore = () => {
    let score = 0;
    quizData.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  // 5. RENDER LOGIC: EMPTY STATE
  if (quizData.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-center">
          <p className="text-zinc-400 mb-6">No active session found.</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 px-6 py-2 rounded-xl font-bold">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  // 6. RENDER LOGIC: FINISH SCREEN (Hand-off to AI Feedback)
  if (isFinished) {
    const finalScore = calculateFinalScore();
    return (
      <div className='min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6'>
        <div className="bg-[#0a0a0a] border border-zinc-800 p-12 rounded-[40px] text-center max-w-md w-full shadow-2xl">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <FiCheckCircle size={40} className="text-blue-500" />
          </div>
          <h2 className='text-3xl font-black mb-2'>Exam Submitted</h2>
          <p className="text-zinc-500 text-sm mb-8 uppercase tracking-widest">Processing Final Analytics...</p>
          
          <div className="bg-zinc-900/50 rounded-2xl p-6 mb-8 border border-zinc-800">
             <p className='text-5xl font-black text-white'>{finalScore} / {quizData.length}</p>
             <p className="text-zinc-600 text-[10px] font-black uppercase mt-2">Correct Responses</p>
          </div>

          <button 
            onClick={() => navigate('/results', { 
              state: { 
                finalScore, 
                quizData, 
                userAnswers, 
                topic: quizTopic 
              } 
            })} 
            className='w-full py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20'
          >
            Generate AI Feedback <FiSend />
          </button>
        </div>
      </div>
    );
  }

  // 7. MAIN UI
  const currentQuestion = quizData[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className='min-h-screen bg-[#050505] text-zinc-300 flex overflow-hidden'>
      
      {/* --- LEFT: EXAM AREA --- */}
      <div className='flex-1 p-12 flex flex-col items-center overflow-y-auto'>
        <header className='w-full max-w-3xl flex justify-between items-center mb-16'>
          <div>
            <h1 className='text-2xl font-black text-white tracking-tighter'>QUIZZFY<span className='text-blue-500'>.AI</span></h1>
            <p className='text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]'>Live Exam Portal</p>
          </div>

          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-colors ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-zinc-900 border-zinc-800 text-blue-400'}`}>
            <FiClock className={timeLeft < 60 ? 'animate-pulse' : ''} />
            <span className='font-mono text-xl font-black'>{formatTime(timeLeft)}</span>
          </div>
        </header>

        <div className='w-full max-w-3xl'>
          <div className='mb-8 flex items-center gap-4'>
            <span className='text-blue-500 font-black text-sm uppercase'>Question {currentIndex + 1}</span>
            <div className='h-[1px] flex-1 bg-zinc-800/50'></div>
          </div>

          <h2 className='text-3xl font-bold text-white mb-12 leading-snug'>
            {currentQuestion.question}
          </h2>

          <div className='grid gap-4'>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex justify-between items-center group
                  ${userAnswers[currentIndex] === option 
                    ? 'border-blue-600 bg-blue-600/10 text-white' 
                    : 'border-zinc-900 bg-[#080808] hover:border-zinc-700 hover:bg-zinc-900/30'}`}
              >
                <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold w-6 h-6 rounded flex items-center justify-center border ${userAnswers[currentIndex] === option ? 'bg-blue-600 border-blue-600' : 'border-zinc-700 text-zinc-500'}`}>
                        {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${userAnswers[currentIndex] === option ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]' : 'bg-zinc-800'}`}></div>
              </button>
            ))}
          </div>

          <footer className="mt-16 flex justify-between items-center pt-8 border-t border-zinc-900">
            <button 
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-zinc-500 hover:text-white disabled:opacity-0 transition-all"
            >
                <FiChevronLeft /> Previous
            </button>

            <div className="flex gap-2">
                {currentIndex + 1 === quizData.length ? (
                    <button 
                        onClick={() => setIsFinished(true)}
                        className="px-10 py-3 rounded-xl bg-blue-600 text-white font-bold hover:brightness-110 shadow-lg shadow-blue-900/20"
                    >
                        Finish Exam
                    </button>
                ) : (
                    <button 
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                        className="flex items-center gap-2 px-10 py-3 rounded-xl bg-zinc-100 text-black font-bold hover:bg-white transition-all"
                    >
                        Next Question <FiChevronRight />
                    </button>
                )}
            </div>
          </footer>
        </div>
      </div>

      {/* --- RIGHT: SIDEBAR NAVIGATOR --- */}
      <aside className='w-96 bg-[#080808] border-l border-zinc-900 p-10 flex flex-col'>
        <div className="mb-10">
            <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6'>Submission Progress</h3>
            <div className='grid grid-cols-2 gap-4'>
                <div className='bg-zinc-900/30 p-5 rounded-[20px] border border-zinc-800/50'>
                    <p className='text-3xl font-black text-white'>{answeredCount}</p>
                    <p className='text-[9px] uppercase font-bold text-zinc-500 mt-1'>Done</p>
                </div>
                <div className='bg-zinc-900/30 p-5 rounded-[20px] border border-zinc-800/50'>
                    <p className='text-3xl font-black text-white text-blue-500'>{quizData.length - answeredCount}</p>
                    <p className='text-[9px] uppercase font-bold text-zinc-500 mt-1'>Remaining</p>
                </div>
            </div>
        </div>

        <h3 className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6'>Question Map</h3>
        <div className='grid grid-cols-4 gap-3 mb-auto'>
          {quizData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-12 rounded-xl font-bold text-sm border-2 transition-all
                ${currentIndex === idx ? 'border-blue-600 text-blue-500 bg-blue-600/10' : 
                  userAnswers[idx] ? 'border-zinc-700 text-zinc-200 bg-zinc-800' : 'border-zinc-900 text-zinc-600 hover:border-zinc-800'}`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </button>
          ))}
        </div>

        <div className='mt-10 p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800/50'>
            <div className='flex items-center gap-4 text-zinc-500 text-xs mb-4'>
                <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></div>
                AI Proctoring Active
            </div>
            <p className="text-[10px] text-zinc-600 leading-relaxed font-medium">
                Your answers are being synchronized in real-time. Do not refresh or exit the window.
            </p>
        </div>
      </aside>
    </div>
  );
};

export default QuizPage;