import type { Alert } from './alert.ts'

interface AlertTableProps {
  alerts: Alert[]
  sensorNames?: Record<string, string>
}

function AlertTable({ alerts, sensorNames = {} }: AlertTableProps) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Sensor</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.message}</td>
                <td>{sensorNames[alert.sensorId] ?? alert.sensorId}</td>
                <td className="timestamp">{new Date(alert.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No alerts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AlertTable
