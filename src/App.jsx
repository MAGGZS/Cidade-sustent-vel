import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import TimelinePage from './pages/TimelinePage'

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<HomePage />} />
      <Route path="/projeto"  element={<ProjectPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
    </Routes>
  )
}
