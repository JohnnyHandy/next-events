import React from 'react'

import { render, screen } from '@testing-library/react'
import MainHeader from '../components/layout/main-header'

describe('Testing main-header.tsx', () => {
  it('Should render the the MainHeader comoonent', () => {
    render(<MainHeader />)
    const component = screen.getByTestId('main-header')

    expect(component).toBeInTheDocument()
  })
})
