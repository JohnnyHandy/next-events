import React from 'react'

import { screen } from '@testing-library/react'
import { render } from './test-utils'
import FilteredEvents from '../pages/events/[...slug]'

describe('Testing homepage [...slug].tsx', () => {
  it('Should render loading message on first render', () => {
    render(<FilteredEvents />, {
      router: {
        pathname: '/events/',
        query: {},
      },
    })
    const component = screen.getByTestId('loading-filtered-events')

    expect(component).toBeInTheDocument()
  })

  it('Should render warning message for invalid filter params', () => {
    render(<FilteredEvents />, {
      router: {
        pathname: '/events/',
        query: {
          slug: ['2021', 'abc'],
        },
      },
    })
    const component = screen.getByTestId('invalid-filter-params')

    expect(component).toBeInTheDocument()
  })

  it('Should render warning message if no filtered events were found', () => {
    render(<FilteredEvents />, {
      router: {
        pathname: '/events/',
        query: {
          slug: ['2023', '1'],
        },
      },
    })
    const component = screen.getByTestId('no-events-found')
    expect(component).toBeInTheDocument()
  })

  it('Should render filtered events list', () => {
    render(<FilteredEvents />, {
      router: {
        pathname: '/events/',
        query: {
          slug: ['2021', '5'],
        },
      },
    })
    const component = screen.getByTestId('filtered-events')
    expect(component).toBeInTheDocument()
  })
})
