import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import QuizPage from './pages/QuizPage'
import DashboardPage from './pages/DashboardPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/test' element={<QuizPage></QuizPage>}></Route>
      <Route path='/results' element={<ResultsPage></ResultsPage>}></Route>
      <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
    </Routes>
  )
}

export default App
