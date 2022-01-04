import React from 'react'

import { render, screen } from '@testing-library/react'
import { DUMMY_EVENTS } from '../data/dummy-data'
import EventItem from '../components/events/event-item'

describe('Testing homepage [eventId].tsx', () => {
  it('Should render the event detail page title', () => {
    render(<EventItem {...DUMMY_EVENTS[0]} />)
    const component = screen.getByTestId('event-item')

    expect(component).toBeInTheDocument()
  })
})
