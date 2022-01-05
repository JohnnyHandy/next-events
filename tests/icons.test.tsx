import React from 'react'

import { render } from '@testing-library/react'
import AddressIcon from '../components/icons/address-icon'
import ArrowRightIcon from '../components/icons/arrow-right-icon'
import DateIcon from '../components/icons/date-icon'

describe('Testing icons files', () => {
  it('Should render svg element on address icon component address-icon.tsx', () => {
    const { container } = render(<AddressIcon />)
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })
  it('Should render svg element on address icon component arrow-right-icon.tsx', () => {
    const { container } = render(<ArrowRightIcon />)
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })
  it('Should render svg element on address icon component date-icon.tsx', () => {
    const { container } = render(<DateIcon />)
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })
})
