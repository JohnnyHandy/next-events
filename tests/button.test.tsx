import React from 'react'

import { render, screen } from '@testing-library/react'
import Button from '../components/ui/button'

describe('Testing button.tsx', () => {
  it('Should render the button link', () => {
    render(<Button link="url">Button</Button>)
    const button = screen.getByTestId('button-link')

    expect(button).toBeInTheDocument()
  })
  it('Should render default button', () => {
    render(<Button>Mock</Button>)
    const button = screen.getByTestId('default')

    expect(button).toBeInTheDocument()
  })
})
