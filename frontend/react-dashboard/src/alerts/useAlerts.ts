import { useEffect, useMemo, useState } from 'react'
import type { Alert } from './alert.ts'
import { getAlerts } from './alertApi.ts'

const POLL_INTERVAL_MS = 5000

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    async function poll() {
      try {
        setAlerts(await getAlerts(controller.signal))
        setError(false)
      } catch (err) {
        if (controller.signal.aborted) return
        console.error(err)
        setError(true)
      }
      setLoading(false)

      if (!controller.signal.aborted) {
        timeoutId = setTimeout(poll, POLL_INTERVAL_MS)
      }
    }

    void poll()

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [])

  const sortedAlerts = useMemo(
    () => [...alerts].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)),
    [alerts],
  )

  return { alerts: sortedAlerts, loading, error }
}
