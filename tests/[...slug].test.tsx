import React from 'react'

import { screen } from '@testing-library/react'
import { render } from './test-utils'
import FilteredEvents from '../pages/events/[...slug]'
import fetchMock from 'jest-fetch-mock'

describe('Testing homepage [...slug].tsx', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should render loading message', () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        e1: {
          date: '01-01-2022',
          description: 'desccription',
          image: 'image',
          isFeatured: false,
          location: 'address',
          title: 'title',
        },
      })
    )

    render(<FilteredEvents />, {
      router: {
        pathname: '/events/',
        query: {
          slug: ['2021', '1'],
        },
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
          slug: ['2022', '1'],
        },
      },
    })
    const component = screen.getByTestId('filtered-events')
    expect(component).toBeInTheDocument()
  })
})
