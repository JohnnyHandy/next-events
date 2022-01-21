import React from 'react'

import { screen } from '@testing-library/react'
import { DUMMY_EVENTS } from '../data/dummy-data'
import { render, mockRouter } from './test-utils'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import EventsPage, { getStaticProps } from '../pages/events'

describe('Testing EventsPage index.tsx', () => {
  it('Should render all events page', () => {
    render(<EventsPage events={DUMMY_EVENTS} />)
    const component = screen.getByTestId('all-events')

    expect(component).toBeInTheDocument()
  })
  it('Should call router.push in findEventsHandler on click to filter events', async () => {
    const useRouter = jest.spyOn(nextRouter, 'useRouter')
    useRouter.mockReturnValue(mockRouter)
    render(<EventsPage events={DUMMY_EVENTS} />)
    const yearSelect = screen.getByTestId('year-select')
    const monthSelect = screen.getByTestId('month-select')
    userEvent.selectOptions(
      yearSelect,
      screen.getByRole('option', { name: '2022' })
    )
    userEvent.selectOptions(
      monthSelect,
      screen.getByRole('option', { name: 'Jan' })
    )
    const submitButton = screen.getByText(/Find Events/)
    await userEvent.click(submitButton)
    expect(mockRouter.push).toHaveBeenCalled()
  })

  it('Should call api on getStaticProps', async () => {
    const context = {
      params: {
        eventId: 'e1',
      },
    }
    fetchMock.mockResponseOnce(
      JSON.stringify({
        e1: {
          date: '01-01-2020',
          description: 'desccription',
          image: 'image',
          isFeatured: false,
          location: 'address',
          title: 'title',
        },
      })
    )
    const response = await getStaticProps(context)
    expect(fetch).toHaveBeenCalled()
    expect(response).toHaveProperty(['props'])
  })
})
