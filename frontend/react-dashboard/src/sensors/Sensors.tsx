import './Sensors.css'
import { useSensors } from './useSensors.ts'

function Sensors() {
  const { sensors, error } = useSensors()

  return (
    <div className="sensors">
      <h1>Sensors</h1>

      {error ? (
        <p className="error">Could not load sensors.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {sensors.length > 0 ? (
              sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.name}</td>
                  <td>{sensor.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No sensors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Sensors
