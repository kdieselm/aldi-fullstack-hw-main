import SensorTable from './SensorTable.tsx'
import './Sensors.css'
import { useSensors } from './useSensors.ts'

function Sensors() {
  const { sensors, loading, error } = useSensors()

  return (
    <div className="sensors">
      <h1>Sensors</h1>

      {loading ? (
        <p>Loading sensors...</p>
      ) : error ? (
        <p className="error">Could not load sensors.</p>
      ) : (
        <SensorTable sensors={sensors} />
      )}
    </div>
  )
}

export default Sensors
