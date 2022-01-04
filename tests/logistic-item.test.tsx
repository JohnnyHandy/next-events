
import React from 'react'

import { render, screen } from '@testing-library/react'
import AddressIcon from '../components/icons/address-icon'
import LogisticsItem from '../components/event-detail/logistics-item'

describe('Testing logistics-item.tsx', () => {
  it('Should render the event logistics component', () => {
    render(<LogisticsItem icon={AddressIcon}>

    </LogisticsItem>)
    const component = screen.getByTestId('logistics-item')

    expect(component).toBeInTheDocument()
  })
})
