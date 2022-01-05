import React from 'react'

import { render, screen } from '@testing-library/react'
import ResultsTitle from '../components/events/results-title'

describe('Testing results-title.tsx', () => {
  it('Should render the the ResultsTitle component', () => {
    render(<ResultsTitle date={new Date()} />)
    const component = screen.getByTestId('results-title')

    expect(component).toBeInTheDocument()
  })
})
