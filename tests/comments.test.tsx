import React from 'react'

import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'

import Comments from '../components/input/comments'
import NotificationContext, {
  NotificationData,
} from '../store/notification-context'

const context: {
  notification: NotificationData | null
  showNotification: () => void
  hideNotification: () => void
} = {
  notification: null,
  showNotification: jest.fn(),
  hideNotification: jest.fn(),
}

describe('Testing comments.tsx', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  beforeEach(() => {
    fetchMock.resetMocks()
    render(
      <NotificationContext.Provider value={context}>
        <Comments eventId="1" />
      </NotificationContext.Provider>
    )
  })

  const showNotificationSpy = jest.spyOn(context, 'showNotification')
  const hideNotificationSpy = jest.spyOn(context, 'hideNotification')

  it('Should render the comments section', () => {
    const component = screen.getByTestId('comments')

    expect(component).toBeInTheDocument()
  })

  describe('Working with toggle comments and adding comments', () => {
    it('Should load comments succesfully', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          c1: {
            name: 'Roger',
            id: 'id',
            text: 'text',
          },
        })
      )

      const commentsButton = screen.getByText(/Show Comments/)
      expect(commentsButton).toBeInTheDocument()
      const toggleCommentHandler = jest.fn(() => undefined)
      commentsButton.onclick = toggleCommentHandler
      act(() => {
        userEvent.click(commentsButton)
      })
      expect(toggleCommentHandler).toHaveBeenCalled()
      expect(commentsButton).toHaveTextContent('Hide Comments')
      expect(fetch).toHaveBeenCalled()
      await new Promise(process.nextTick)
      expect(showNotificationSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ title: 'Loading' })
      )
      expect(hideNotificationSpy).toHaveBeenCalled()
    })

    it('Should show error notification on get comments failure', async () => {
      fetchMock.mockReject(new Error('Error'))

      const commentsButton = screen.getByText(/Show Comments/)
      act(() => {
        userEvent.click(commentsButton)
      })
      await new Promise(process.nextTick)
      expect(showNotificationSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ title: 'Error!' })
      )
    })

    it('Should call toggle comment handler on button click, change button tex, shows comment form and be able to call add comment handler', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          c1: {
            name: 'Roger',
            id: 'id',
            text: 'text',
          },
        })
      )
      const commentsButton = screen.getByText(/Show Comments/)
      expect(commentsButton).toBeInTheDocument()
      const toggleCommentHandler = jest.fn(() => undefined)
      commentsButton.onclick = toggleCommentHandler
      act(() => {
        userEvent.click(commentsButton)
      })
      expect(toggleCommentHandler).toHaveBeenCalled()
      expect(commentsButton).toHaveTextContent('Hide Comments')
      expect(fetch).toHaveBeenCalled()

      const commentForm = screen.getByTestId('comment-form')

      const submitHandler = jest.fn((e) => {
        e.preventDefault()
      })
      commentForm.onsubmit = submitHandler

      const sendCommentButton = screen.getByTestId('send-comment')
      const emailInput = screen.getByTestId('email-input')
      const nameInput = screen.getByTestId('name-input')
      const commentInput = screen.getByTestId('comment-input')

      act(() => {
        fireEvent.change(emailInput, { target: { value: 'abc@email.com' } })
        fireEvent.change(nameInput, { target: { value: 'abc' } })
        fireEvent.change(commentInput, { target: { value: 'comment' } })

        userEvent.click(sendCommentButton)
      })

      await new Promise(process.nextTick)
      expect(showNotificationSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ title: 'Success!' })
      )
    })

    it('Should show error notif on sending comment error', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          c1: {
            name: 'Roger',
            id: 'id',
            text: 'text',
          },
        })
      )
      const commentsButton = screen.getByText(/Show Comments/)
      expect(commentsButton).toBeInTheDocument()
      const toggleCommentHandler = jest.fn(() => undefined)
      commentsButton.onclick = toggleCommentHandler
      act(() => {
        userEvent.click(commentsButton)
      })
      expect(toggleCommentHandler).toHaveBeenCalled()
      expect(commentsButton).toHaveTextContent('Hide Comments')
      expect(fetch).toHaveBeenCalled()

      const commentForm = screen.getByTestId('comment-form')

      const submitHandler = jest.fn((e) => {
        e.preventDefault()
      })
      commentForm.onsubmit = submitHandler

      const sendCommentButton = screen.getByTestId('send-comment')
      const emailInput = screen.getByTestId('email-input')
      const nameInput = screen.getByTestId('name-input')
      const commentInput = screen.getByTestId('comment-input')
      fetchMock.mockRejectOnce(new Error('Error'))

      act(() => {
        fireEvent.change(emailInput, { target: { value: 'abc@email.com' } })
        fireEvent.change(nameInput, { target: { value: 'abc' } })
        fireEvent.change(commentInput, { target: { value: 'comment' } })

        userEvent.click(sendCommentButton)
      })
      await new Promise(process.nextTick)
      expect(showNotificationSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({ title: 'Error!' })
      )
    })
  })
})
