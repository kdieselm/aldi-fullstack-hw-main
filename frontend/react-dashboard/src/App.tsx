import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import SensorReadings from './sensor-readings/SensorReadings.tsx'
import Sensors from './sensors/Sensors.tsx'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/sensors">Sensors</Link>
        <Link to="/sensor-readings">Add sensor reading</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/sensors" replace />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/sensor-readings" element={<SensorReadings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
