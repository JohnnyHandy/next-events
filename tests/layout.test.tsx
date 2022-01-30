import React from 'react'

import { render, screen } from '@testing-library/react'
import Layout from '../components/layout/layout'
import NotificationContext, {
  NotificationData,
} from '../store/notification-context'

describe('Testing layout.tsx', () => {
  it('Should render the Layout component', () => {
    render(<Layout>Mock</Layout>)
    const component = screen.getByTestId('layout')

    expect(component).toBeInTheDocument()
  })
  it('Should render main header into the layout compoonent', () => {
    render(<Layout>Mock</Layout>)
    const component = screen.getByTestId('main-header')

    expect(component).toBeInTheDocument()
  })

  it('Should render success notification if there is active success notification', () => {
    const context: {
      notification: NotificationData | null
      showNotification: () => void
      hideNotification: () => void
    } = {
      notification: {
        title: 'Success',
        message: 'Mocking message',
        status: 'success',
      },
      showNotification: jest.fn(),
      hideNotification: jest.fn(),
    }

    render(
      <NotificationContext.Provider value={context}>
        <Layout>Mock</Layout>
      </NotificationContext.Provider>
    )
    const notificationComponent = screen.getByTestId('notification')
    expect(notificationComponent).toBeInTheDocument()
  })

  it('Should render error notification if there is active erroor notification', () => {
    const context: {
      notification: NotificationData | null
      showNotification: () => void
      hideNotification: () => void
    } = {
      notification: {
        title: 'Error',
        message: 'Mocking message',
        status: 'error',
      },
      showNotification: jest.fn(),
      hideNotification: jest.fn(),
    }

    render(
      <NotificationContext.Provider value={context}>
        <Layout>Mock</Layout>
      </NotificationContext.Provider>
    )
    const notificationComponent = screen.getByTestId('notification')
    expect(notificationComponent).toBeInTheDocument()
  })

  it('Should render pending notification if there is active pending notification', () => {
    const context: {
      notification: NotificationData | null
      showNotification: () => void
      hideNotification: () => void
    } = {
      notification: {
        title: 'Pending',
        message: 'Mocking message',
        status: 'pending',
      },
      showNotification: jest.fn(),
      hideNotification: jest.fn(),
    }

    render(
      <NotificationContext.Provider value={context}>
        <Layout>Mock</Layout>
      </NotificationContext.Provider>
    )
    const notificationComponent = screen.getByTestId('notification')
    expect(notificationComponent).toBeInTheDocument()
  })
})
