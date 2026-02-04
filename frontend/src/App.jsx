import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import QuizPage from './pages/QuizPage'
import Results from './pages/Results'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/test' element={<QuizPage></QuizPage>}></Route>
      <Route path='/results' element={<Results></Results>}></Route>
      <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
    </Routes>
  )
}

export default App
