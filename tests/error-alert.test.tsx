import React from 'react'

import { render, screen } from '@testing-library/react'
import ErrorAlert from '../components/ui/error-alert'

describe('Testing results-title.tsx', () => {
  it('Should render the the ErrorAlert component', () => {
    render(<ErrorAlert>Mock</ErrorAlert>)
    const component = screen.getByTestId('error-alert')

    expect(component).toBeInTheDocument()
  })
})
