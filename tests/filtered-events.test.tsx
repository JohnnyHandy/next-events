import React from 'react'

import { render, screen } from '@testing-library/react'
import HomePage from '../pages/events/[...slug]'

describe('Testing events [...slug]tsx', () => {
    it('Should render filtered events page title', () => {
        render(<HomePage />)
        const title = screen.getByText(/Filtered events/)

        expect(title).toBeInTheDocument()
    })
})