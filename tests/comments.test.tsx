import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comments from '../components/input/comments'
import fetchMock from 'jest-fetch-mock'

describe('Testing comments.tsx', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    render(<Comments eventId="1" />)
  })
  it('Should render the comments section', () => {
    const component = screen.getByTestId('comments')

    expect(component).toBeInTheDocument()
  })

  describe('Working with toggle comments and adding comments', () => {
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

      const submitButton = screen.getByText(/Show Comments/)
      expect(submitButton).toBeInTheDocument()
      const toggleCommentHandler = jest.fn(() => undefined)
      submitButton.onclick = toggleCommentHandler
      await userEvent.click(submitButton)
      expect(toggleCommentHandler).toHaveBeenCalled()
      expect(submitButton).toHaveTextContent('Hide Comments')
      expect(fetch).toHaveBeenCalled()

      const commentForm = screen.getByTestId('comment-form')
      expect(commentForm).toBeInTheDocument()

      const submitHandler = jest.fn((e) => {
        e.preventDefault()
      })
      commentForm.onsubmit = submitHandler

      const sendCommentButton = screen.getByTestId('send-comment')
      expect(sendCommentButton).toBeInTheDocument()

      const emailInput = screen.getByTestId('email-input')
      expect(emailInput).toBeInTheDocument()

      const nameInput = screen.getByTestId('name-input')
      expect(nameInput).toBeInTheDocument()

      const commentInput = screen.getByTestId('comment-input')
      expect(commentInput).toBeInTheDocument()

      fireEvent.change(emailInput, { target: { value: 'abc@email.com' } })
      fireEvent.change(nameInput, { target: { value: 'abc' } })
      fireEvent.change(commentInput, { target: { value: 'comment' } })

      await userEvent.click(sendCommentButton)

      expect(submitHandler).toHaveBeenCalled()
    })
  })
})
