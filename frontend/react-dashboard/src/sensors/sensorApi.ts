import type { Sensor } from './sensor.ts'

export async function getSensors(signal?: AbortSignal): Promise<Sensor[]> {
  const response = await fetch('/api/sensors', { signal })
  if (!response.ok) {
    throw new Error(`GET /api/sensors failed with ${response.status}`)
  }
  return response.json()
}
