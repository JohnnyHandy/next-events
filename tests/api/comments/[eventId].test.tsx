/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '../../../pages/api/comments/[eventId]'
import {
  createMocks as _createMocks,
  Mocks,
  RequestOptions,
  ResponseOptions,
} from 'node-mocks-http'

const createMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions
  // @ts-ignore: Fixing this: https://github.com/howardabrams/node-mocks-http/issues/245
) => Mocks<NextApiRequest, NextApiResponse>
describe('Test responses for comments eventId api', () => {
  it('Should return status 201 with invalid request body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abc@email.com',
        name: 'Roger',
        text: 'text',
      }),
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Added comment.',
      })
    )
  })

  it('Should return status 422 with invalid req body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abcemail.com',
      }),
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(422)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Invalid input.',
      })
    )
  })

  it('Should return comments data on get req', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})
