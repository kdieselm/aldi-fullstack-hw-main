import { useEffect, useState } from 'react'
import type { Sensor } from './sensor.ts'
import { getSensors } from './sensorApi.ts'

export function useSensors() {
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

  return { sensors, error }
}
