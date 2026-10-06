import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import Alerts from './alerts/Alerts.tsx'
import SensorReadings from './sensor-readings/SensorReadings.tsx'
import Sensors from './sensors/Sensors.tsx'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/sensors">Sensors</Link>
        <Link to="/sensor-readings">Add sensor reading</Link>
        <Link to="/alerts">Alerts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/sensors" replace />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/sensor-readings" element={<SensorReadings />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
