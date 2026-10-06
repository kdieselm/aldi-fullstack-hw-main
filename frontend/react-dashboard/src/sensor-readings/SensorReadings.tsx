import { useState, type FormEvent } from 'react'
import { useSensors } from '../sensors/useSensors.ts'
import { createReading } from './sensorReadingApi.ts'
import './SensorReadings.css'

type Field = 'sensorId' | 'value' | 'timestamp'
type FormValues = Record<Field, string>
type FormErrors = Partial<Record<Field, string>>

const emptyValues: FormValues = { sensorId: '', value: '', timestamp: '' }
const untouched: Record<Field, boolean> = { sensorId: false, value: false, timestamp: false }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.sensorId) errors.sensorId = 'Sensor is required.'
  if (!values.value) errors.value = 'Value is required.'
  if (!values.timestamp) errors.timestamp = 'Timestamp is required.'
  return errors
}

function SensorReadings() {
  const { sensors, error: sensorsError } = useSensors()

  const [values, setValues] = useState(emptyValues)
  const [touched, setTouched] = useState(untouched)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  function setField(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function markTouched(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function fieldError(field: Field) {
    return touched[field] ? errors[field] : undefined
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!isValid) {
      setTouched({ sensorId: true, value: true, timestamp: true })
      return
    }

    setSubmitting(true)
    try {
      await createReading({
        sensorId: values.sensorId,
        value: Number(values.value),
        timestamp: values.timestamp,
      })
      setSuccessMessage('Sensor reading saved.')
      setValues({ ...emptyValues, sensorId: values.sensorId })
      setTouched(untouched)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not save sensor reading.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="sensor-readings">
      <h1>Add sensor reading</h1>

      {sensorsError && <p className="error">Could not load sensors.</p>}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          <b>Sensor</b>
          <select
            value={values.sensorId}
            onChange={(e) => setField('sensorId', e.target.value)}
            onBlur={() => markTouched('sensorId')}
          >
            <option value="" disabled>
              Select a sensor
            </option>
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name} ({sensor.type})
              </option>
            ))}
          </select>
        </label>
        {fieldError('sensorId') && <p className="error">{fieldError('sensorId')}</p>}

        <label>
          <b>Value</b>
          <input
            type="number"
            step="any"
            value={values.value}
            onChange={(e) => setField('value', e.target.value)}
            onBlur={() => markTouched('value')}
          />
        </label>
        {fieldError('value') && <p className="error">{fieldError('value')}</p>}

        <label>
          <b>Timestamp</b>
          <input
            type="datetime-local"
            value={values.timestamp}
            onChange={(e) => setField('timestamp', e.target.value)}
            onBlur={() => markTouched('timestamp')}
          />
        </label>
        {fieldError('timestamp') && <p className="error">{fieldError('timestamp')}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save sensor reading'}
        </button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default SensorReadings
