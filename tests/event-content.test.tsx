import React from 'react'

import { render, screen } from '@testing-library/react'
import EventContent from '../components/event-detail/event-content'

describe('Testing event-content.tsx', () => {
  it('Should render the event content component', () => {
    render(<EventContent>Mock</EventContent>)
    const component = screen.getByTestId('event-content')

    expect(component).toBeInTheDocument()
  })
})
