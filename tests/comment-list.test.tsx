import React from 'react'

import { render, screen } from '@testing-library/react'
import CommentList from '../components/input/comment-list'

const dummyList = [
  {
    _id: 'c1',
    name: 'Roger',
    text: 'A first comment',
  },
  {
    _id: 'c2',
    name: 'Roger',
    text: 'A second comment',
  },
]

describe('Testing comment-list.tsx', () => {
  it('Should render the comment list', () => {
    render(<CommentList comments={dummyList} />)
    const component = screen.getByTestId('comment-list')

    expect(component).toBeInTheDocument()
  })
})
