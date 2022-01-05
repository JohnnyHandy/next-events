import React from 'react'

import { render, screen } from '@testing-library/react'
import EventSummary from '../components/event-detail/event-summary'

describe('Testing event-summary.tsx', () => {
  it('Should render the event summary component', () => {
    render(<EventSummary title="" />)
    const component = screen.getByTestId('event-summary')

    expect(component).toBeInTheDocument()
  })
})
