import React from 'react'

import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'

describe('Testing homepage Index.tsx', () => {
    it('Should render the home page title', () => {
        render(<HomePage />)
        const title = screen.getByText(/The Home Page/)

        expect(title).toBeInTheDocument()
    })
})