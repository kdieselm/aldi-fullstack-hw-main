import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Sensor } from './sensor.ts'
import { getSensors } from './sensorApi.ts'

describe('sensorApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should fetch sensors from the API', async () => {
    const sensors: Sensor[] = [
      { id: '1', name: 'Freezer', type: 'TEMPERATURE' },
      { id: '2', name: 'Warehouse', type: 'HUMIDITY' },
    ]
    const fetchMock = vi.fn().mockResolvedValue(Response.json(sensors))
    vi.stubGlobal('fetch', fetchMock)

    const result = await getSensors()

    expect(fetchMock).toHaveBeenCalledWith('/api/sensors', expect.anything())
    expect(result).toEqual(sensors)
  })

  it('should throw when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })))

    await expect(getSensors()).rejects.toThrow('GET /api/sensors failed with 500')
  })
})
