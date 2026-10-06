import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SensorTable from './SensorTable.tsx'

describe('SensorTable', () => {
  it('should render a row for each sensor', () => {
    render(
      <SensorTable
        sensors={[
          { id: '1', name: 'Freezer', type: 'TEMPERATURE' },
          { id: '2', name: 'Warehouse', type: 'HUMIDITY' },
        ]}
      />,
    )

    // First row is the header, the rest are sensors
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows).toHaveLength(2)
    expect(rows[0]).toHaveTextContent('Freezer')
    expect(rows[0]).toHaveTextContent('TEMPERATURE')
    expect(rows[1]).toHaveTextContent('Warehouse')
    expect(rows[1]).toHaveTextContent('HUMIDITY')
  })

  it('should show an empty message when there are no sensors', () => {
    render(<SensorTable sensors={[]} />)

    expect(screen.getByText('No sensors found.')).toBeInTheDocument()
  })
})
