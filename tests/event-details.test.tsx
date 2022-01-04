import React from 'react'

import { screen } from '@testing-library/react'
import { render } from './test-utils'
import EventDetails from '../pages/events/[eventId]'


describe('Testing homepage [eventId].tsx', () => {
  it('Should render the event details page component if found event by id', () => {
    render(<EventDetails />, {
      router: { pathname: '/events/[eventId]', query: { eventId: 'e2' } }
    })
    const component = screen.getByTestId('event-details')

    expect(component).toBeInTheDocument()
  })

  it('Should render warning message if event id is invalid', () => {
    render(<EventDetails />, {
      router: { pathname: '/events/[eventId]', query: { eventId: '1' } }
    })
    const message = screen.getByText(/No event found!/)

    expect(message).toBeInTheDocument()
  })
})
