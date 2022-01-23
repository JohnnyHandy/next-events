/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next'

import newsletter from '../../pages/api/newsletter'
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
describe('Test responses for newsletter api', () => {
  it('Should return status 201 with invalid request body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abc@email.com',
      }),
    })
    await newsletter(req, res)
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Signed up!',
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
    await newsletter(req, res)
    expect(res._getStatusCode()).toBe(422)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Invalid email address',
      })
    )
  })
})
