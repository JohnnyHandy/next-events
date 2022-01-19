import React from 'react'

import { render, screen } from '@testing-library/react'
import { DUMMY_EVENTS } from '../data/dummy-data'
import HomePage, { getStaticProps } from '../pages/index'
import fetchMock from 'jest-fetch-mock'

describe('Testing homepage Index.tsx', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  it('Should render home page', () => {
    render(<HomePage events={DUMMY_EVENTS} />)
    const title = screen.getByTestId('home')

    expect(title).toBeInTheDocument()
  })

  it("Should call api on getStaticProps", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ e1: { date: '01-01-2020', description: "desccription", image: "image", isFeatured: false, location: "address", title: "title" }  }))
    await getStaticProps()
    expect(fetch).toHaveBeenCalled()
  })
})
