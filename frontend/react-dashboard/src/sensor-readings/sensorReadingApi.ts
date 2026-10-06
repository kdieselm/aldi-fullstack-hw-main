import type { SensorReading } from './sensorReading.ts'

export async function createReading(reading: SensorReading): Promise<SensorReading> {
  const response = await fetch('/api/sensor-readings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reading),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.errors ?? 'Could not save sensor reading.')
  }
  return response.json()
}
