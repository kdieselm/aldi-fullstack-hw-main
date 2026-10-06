import { useMemo } from 'react'
import { useSensors } from '../sensors/useSensors.ts'
import AlertTable from './AlertTable.tsx'
import './Alerts.css'
import { useAlerts } from './useAlerts.ts'

function Alerts() {
  const { alerts, loading, error } = useAlerts()
  const { sensors } = useSensors()

  const sensorNames = useMemo(
    () => Object.fromEntries(sensors.map((s) => [s.id, s.name])),
    [sensors],
  )

  return (
    <div className="alerts">
      <h1>Alerts</h1>

      {loading ? (
        <p>Loading alerts...</p>
      ) : error ? (
        <p className="error">Could not load alerts. Retrying...</p>
      ) : (
        <AlertTable alerts={alerts} sensorNames={sensorNames} />
      )}
    </div>
  )
}

export default Alerts
