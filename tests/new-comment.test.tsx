import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewComment from '../components/input/new-comment'

describe('Testing new-comment.tsx', () => {
  beforeEach(() => {
    render(<NewComment onAddComment={() => undefined} />)
  })

  it('Should render the comment form', () => {
    const component = screen.getByTestId('comment-form')

    expect(component).toBeInTheDocument()
  })

  it('Should call submit handler with correct from inputs', async () => {
    const commentForm = screen.getByTestId('comment-form')

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

  it('Should show warning message if user tryies to submit invalid data', async () => {
    const commentForm = screen.getByTestId('comment-form')

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

    fireEvent.change(emailInput, { target: { value: 'abcmail.com' } })
    fireEvent.change(nameInput, { target: { value: 'abc' } })
    fireEvent.change(commentInput, { target: { value: 'comment' } })

    await userEvent.click(sendCommentButton)

    const warning = screen.getByTestId('invalid-input')
    expect(warning).toBeInTheDocument()
  })
})
