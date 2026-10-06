import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Sensors from './sensors/Sensors.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sensors" replace />} />
        <Route path="/sensors" element={<Sensors />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
