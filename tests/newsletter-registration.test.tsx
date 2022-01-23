import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterRegistration from '../components/input/newsletter-registration'

describe('Testing newsletter-registration.tsx', () => {
  beforeEach(() => {
    render(<NewsletterRegistration />)
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
})
