/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

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

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('Should return status 500 on database connection error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'abc@email.com',
        name: 'Author test',
        text: 'text',
      },
    })
    //@ts-ignore
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockRejectedValueOnce(new Error)

    await handler(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)
  })

  it('Should return status 201 with valid request body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'abc@email.com',
        name: 'Author test',
        text: 'text',
      },
    })
    const insertOne = jest.fn().mockResolvedValueOnce({ acknowleged: true })
    const collection = jest.fn().mockReturnValueOnce({ insertOne })
    //@ts-ignore
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce({ db: jest.fn().mockReturnValueOnce({ collection }), close: jest.fn() })

    await handler(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: 'Added comment.',
      })
    )
  })

  it('Should return status 500 on insert comment error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'abc@email.com',
        name: 'Author test',
        text: 'text',
      },
    })
    const insertOne = jest.fn().mockRejectedValueOnce(new Error)
    const collection = jest.fn().mockReturnValueOnce({ insertOne })
    //@ts-ignore
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce({ db: jest.fn().mockReturnValueOnce({ collection }), close: jest.fn() })

    await handler(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)
  })

  it('Should return status 422 with invalid req body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'abcemail.com',
      },
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
    const toArray = jest.fn()
    const sort = jest.fn().mockReturnValueOnce({ toArray })
    const find = jest.fn().mockReturnValueOnce({ sort })
    const collection = jest.fn().mockReturnValueOnce({ find })
    //@ts-ignore
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce({ db: jest.fn().mockReturnValueOnce({ collection }), close: jest.fn() })

    await handler(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(200)
  })

  it('Should return status 500 on failure to get comments', async () => {

    const { req, res } = createMocks({
      method: 'GET',
    })

    const find = jest.fn().mockRejectedValueOnce(new Error)
    const collection = jest.fn().mockReturnValueOnce({ find })
    //@ts-ignore
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockResolvedValueOnce({ db: jest.fn().mockReturnValueOnce({ collection }), close: jest.fn() })
    await handler(req, res)
    expect(connectSpy).toHaveBeenCalled()
    expect(res._getStatusCode()).toBe(500)

  })
})
