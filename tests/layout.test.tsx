import React from 'react'

import { render, screen } from '@testing-library/react'
import Layout from '../components/layout/layout'

describe('Testing layout.tsx', () => {
  it('Should render the Layout component', () => {
    render(<Layout>

    </Layout>)
    const component = screen.getByTestId('layout')

    expect(component).toBeInTheDocument()
  })
  it('Should render main header into the layout compoonent', () => {
    render(<Layout>

        </Layout>)
        const component = screen.getByTestId('main-header')
    
        expect(component).toBeInTheDocument()
    
  })
})
