import React from 'react'

import { screen } from '@testing-library/react'
import { render, mockRouter } from './test-utils'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import EventsPage from '../pages/events'

describe('Testing EventsPage index.tsx', () => {
  it('Should render all events page', () => {
    render(<EventsPage />)
    const component = screen.getByTestId('all-events')

    expect(component).toBeInTheDocument()
  })
  it('Should call router.push in findEventsHandler on click to filter events', async () => {
    const useRouter = jest.spyOn(nextRouter, 'useRouter')
    useRouter.mockReturnValue(mockRouter)
    render(<EventsPage />)
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
})
