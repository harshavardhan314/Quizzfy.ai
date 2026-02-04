import React, { useState } from 'react'
import { quizData } from '../assets/mockQuiz'

const QuizPage = () => {
  // 1. Track the index of the current question
  const [currentIndex, setCurrentIndex] = useState(0);
  // 2. Track the user's score
  const [score, setScore] = useState(0);
  // 3. Track if the quiz is finished
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleAnswer = (selectedOption) => {
    // Check if correct
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Move to next question or finish
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className='min-h-screen bg-[#151518] text-white flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold'>Quiz Completed!</h2>
        <p className='text-xl mt-4'>Your Score: {score} / {quizData.length}</p>
        <button 
          onClick={navigator('/results')} 
          className='mt-6 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700'>
          submit
        </button>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen bg-[#151518] text-white p-6 flex flex-col items-center'>
        <header className='w-full max-w-2xl flex justify-between items-center mb-10'>
            <h1 className='text-xl font-bold text-blue-400'>Quizzy AI</h1>
            <span className='bg-zinc-800 px-3 py-1 rounded-full text-sm'>
                Question {currentIndex + 1} of {quizData.length}
            </span>
        </header>

        <div className='w-full max-w-2xl bg-[#1e1e22] border border-zinc-800 p-8 rounded-2xl shadow-xl'>
            <h2 className='text-2xl font-semibold mb-8'>{currentQuestion.question}</h2>

            <div className='grid gap-4'>
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className='w-full text-left p-4 rounded-xl border border-zinc-700 bg-[#252529] hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200'
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default QuizPage