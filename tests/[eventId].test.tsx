import React from 'react'

import { screen } from '@testing-library/react'
import { DUMMY_EVENTS } from '../data/dummy-data'
import { render } from './test-utils'
import fetchMock from 'jest-fetch-mock'
import EventDetails, { getStaticProps, getStaticPaths } from '../pages/events/[eventId]'

describe('Testing homepage [eventId].tsx', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Should render the event details page component if found event by id', () => {
    render(<EventDetails selectedEvent={DUMMY_EVENTS[0]} />)
    const component = screen.getByTestId('event-details')

    expect(component).toBeInTheDocument()
  })

  it('Should render warning message if event id is invalid', () => {
    render(<EventDetails selectedEvent={undefined} />, {
      router: { pathname: '/events/[eventId]', query: { eventId: '1' } },
    })
    const message = screen.getByText(/No event found!/)

    expect(message).toBeInTheDocument()
  })
  it("Should call api on getStaticProps", async () => {
    const context = {
      params: {
        eventId: 'e1'
      }
    }
    fetchMock.mockResponseOnce(JSON.stringify({ e1: { date: '01-01-2020', description: "desccription", image: "image", isFeatured: false, location: "address", title: "title" }  }))
    const response = await getStaticProps(context)
    expect(fetch).toHaveBeenCalled()
    expect(response).toHaveProperty(["props"])
  })

  it("Should call api on getStaticPaths", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ e1: { date: '01-01-2020', description: "desccription", image: "image", isFeatured: false, location: "address", title: "title" }  }))
    const response = await getStaticPaths()
    expect(fetch).toHaveBeenCalled()
    expect(response).toHaveProperty(["paths"])

  })
})
