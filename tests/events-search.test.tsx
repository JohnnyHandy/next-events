import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventsSearch from '../components/events/events-search'

describe('Testing event-search.tsx', () => {
  let onSearch = () => {
    return undefined
  }
  beforeEach(() => {
    onSearch = jest.fn()
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  it('Should render the event search form component', () => {
    render(
      <EventsSearch
        onSearch={() => {
          return undefined
        }}
      />
    )
    const component = screen.getByTestId('events-search-form')

    expect(component).toBeInTheDocument()
  })

  it('Should call submit handler when clicking button to find event', async () => {
    render(<EventsSearch onSearch={onSearch} />)
    const submitButton = screen.getByText(/Find Events/)
    const submitHandler = jest.fn((e) => e.preventDefault())
    const form = screen.getByTestId('events-search-form')
    form.onsubmit = submitHandler
    await userEvent.click(submitButton)
    expect(submitHandler).toHaveBeenCalled()
  })
  it('Should call onSearch with values when selecting options', async () => {
    render(<EventsSearch onSearch={onSearch} />)
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
    expect(onSearch).toHaveBeenCalledWith('2022', '1')
  })
})
