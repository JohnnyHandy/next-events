import React from 'react'

import { render, screen } from '@testing-library/react'
import EventsPage from '../pages/events'

describe('Testing EventsPage index.tsx', () => {
    it('Should render events page title', () => {
        render(<EventsPage />)
        const title = screen.getByText(/All Events/)

        expect(title).toBeInTheDocument()
    })
})