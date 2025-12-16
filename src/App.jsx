import { Routes, Route, Navigate } from 'react-router-dom'
import Intro from './components/Intro'
import Assessment from './components/Assessment'
import Results from './components/Results'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
