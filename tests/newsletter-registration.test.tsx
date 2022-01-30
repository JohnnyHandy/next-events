import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'

import NotificationContext, {
  NotificationData,
} from '../store/notification-context'

import NewsletterRegistration from '../components/input/newsletter-registration'

const context: {
  notification: NotificationData | null
  showNotification: () => void
  hideNotification: () => void
} = {
  notification: null,
  showNotification: jest.fn(),
  hideNotification: jest.fn(),
}

describe('Testing newsletter-registration.tsx', () => {
  const showNotificationSpy = jest.spyOn(context, 'showNotification')

  beforeEach(() => {
    fetchMock.resetMocks()
    render(
      <NotificationContext.Provider value={context}>
        <NewsletterRegistration />
      </NotificationContext.Provider>
    )
  })
  it('Should render the newsletter registration', () => {
    const component = screen.getByTestId('newsletter-registration')

    expect(component).toBeInTheDocument()
  })

  it('Should render submit buttn, and, when clicked, call registrationhandler', async () => {
    const form = screen.getByTestId('registration-form')
    const submitButton = screen.getByTestId('submit-button')

    const registrationHandler = jest.fn((e) => e.preventDefault())
    form.onsubmit = registrationHandler
    await userEvent.click(submitButton)
    expect(registrationHandler).toHaveBeenCalled()
  })

  it('Should show success notification on successful registering', async () => {
    const form = screen.getByTestId('registration-form')
    const submitButton = screen.getByTestId('submit-button')
    const emailInput = screen.getByTestId('input-email')

    const registrationHandler = jest.fn((e) => e.preventDefault())
    form.onsubmit = registrationHandler

    fireEvent.change(emailInput, { target: { value: 'abc@email.com' } })

    await userEvent.click(submitButton)

    expect(showNotificationSpy).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Signing Up' })
    )
    expect(showNotificationSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ title: 'Success!' })
    )
  })

  it('Should show error notification on failure to register email', async () => {
    fetchMock.mockRejectOnce(new Error('Unexpected error'))

    const form = screen.getByTestId('registration-form')
    const submitButton = screen.getByTestId('submit-button')
    const emailInput = screen.getByTestId('input-email')

    const registrationHandler = jest.fn((e) => e.preventDefault())
    form.onsubmit = registrationHandler

    fireEvent.change(emailInput, { target: { value: 'abc@email.com' } })

    await userEvent.click(submitButton)
    await new Promise(process.nextTick)

    expect(showNotificationSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ title: 'Error!' })
    )
  })
})
