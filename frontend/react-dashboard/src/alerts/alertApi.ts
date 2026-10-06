import type { Alert } from './alert.ts'

export async function getAlerts(signal?: AbortSignal): Promise<Alert[]> {
  const response = await fetch('/api/alerts', { signal })
  if (!response.ok) {
    throw new Error(`GET /api/alerts failed with ${response.status}`)
  }
  return response.json()
}
