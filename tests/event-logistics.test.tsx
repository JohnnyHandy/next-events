import React from 'react'

import { render, screen } from '@testing-library/react'
import EventLogistics from '../components/event-detail/event-logistics'

describe('Testing event-logistics.tsx', () => {
  it('Should render the event logistics component', () => {
    render(<EventLogistics date={''} address={''} image="" imageAlt="" />)
    const component = screen.getByTestId('event-logistics')

    expect(component).toBeInTheDocument()
  })
})
