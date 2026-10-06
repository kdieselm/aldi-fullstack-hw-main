import { useEffect, useState } from 'react'
import type { Sensor } from './sensor.ts'
import { getSensors } from './sensorApi.ts'
import './Sensors.css'

function Sensors() {
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    getSensors(controller.signal)
      .then(setSensors)
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.error(err)
          setError(true)
        }
      })

    return () => controller.abort()
  }, [])

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
