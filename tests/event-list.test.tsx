import React from 'react'

import { render, screen } from '@testing-library/react'
import { DUMMY_EVENTS } from '../data/dummy-data'
import EventList from '../components/events/event-list'

describe('Testing event-list.tsx', () => {
  it('Should render the events list', () => {
    render(<EventList items={DUMMY_EVENTS} />)
    const component = screen.getByTestId('event-list')

    expect(component).toBeInTheDocument()
  })
})
