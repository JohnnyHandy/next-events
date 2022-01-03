import React from 'react'

import { render, screen } from '@testing-library/react'
import EventDetails from '../pages/events/[eventId]'

describe('Testing homepage [eventId].tsx', () => {
    it('Should render the event detail page title', () => {
        render(<EventDetails />)
        const title = screen.getByText(/Event detail/)

        expect(title).toBeInTheDocument()
    })
})