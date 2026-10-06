import type { Sensor } from './sensor.ts'

interface SensorTableProps {
  sensors: Sensor[]
}

function SensorTable({ sensors }: SensorTableProps) {
  return (
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
  )
}

export default SensorTable
