/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createMocks as _createMocks,
  Mocks,
  RequestOptions,
  ResponseOptions,
} from 'node-mocks-http'
import { MongoClient } from 'mongodb'

import newsletter from '../../pages/api/newsletter'

const createMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions
  // @ts-ignore: Fixing this: https://github.com/howardabrams/node-mocks-http/issues/245
) => Mocks<NextApiRequest, NextApiResponse>
describe('Test responses for newsletter api', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should return status 500 on failure to connect to database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abc@email.com',
      }),
    })
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      //@ts-ignore
      .mockRejectedValueOnce(new Error())
    await newsletter(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)
  })

  it('Should return status 201 with valid request body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abc@email.com',
      }),
    })
    const insertOne = jest.fn().mockResolvedValueOnce({ acknowleged: true })
    const collection = jest.fn().mockReturnValueOnce({ insertOne })
    //@ts-ignore
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockResolvedValueOnce({
        //@ts-ignore
        db: jest.fn().mockReturnValueOnce({ collection }),
        //@ts-ignore
        close: jest.fn(),
      })
    await newsletter(req, res)
    expect(connectSpy).toHaveBeenCalled()
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

  it('Should return status 500 on failure to insert item to database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      //@ts-ignore
      body: JSON.stringify({
        email: 'abc@email.com',
      }),
    })
    const insertOne = jest.fn().mockRejectedValueOnce(new Error())
    const collection = jest.fn().mockReturnValueOnce({ insertOne })
    //@ts-ignore
    const connectSpy = jest
      .spyOn(MongoClient, 'connect')
      .mockResolvedValueOnce({
        //@ts-ignore
        db: jest.fn().mockReturnValueOnce({ collection }),
        //@ts-ignore
        close: jest.fn(),
      })
    await newsletter(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)
  })
})
