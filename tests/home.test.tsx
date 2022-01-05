import React from 'react'

import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'

describe('Testing homepage Index.tsx', () => {
  it('Should render home page', () => {
    render(<HomePage />)
    const title = screen.getByTestId('home')

    expect(title).toBeInTheDocument()
  })
})
