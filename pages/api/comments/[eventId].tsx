import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb'
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string

  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

  if (req.method === 'POST') {
    const parsedBody = req.body
    const { email, name, text } = parsedBody
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' })
      client?.close()
      return
    }
    const newComment : {
      email: string
      name: string
      text: string
      eventId: string
      _id?: ObjectId
    } = {
      email,
      name,
      text,
      eventId
    }
    try {
      const result = await insertDocument(client as MongoClient, 'comments', newComment)
      newComment._id = result?.insertedId
      res.status(201).json({ message: 'Added comment.', comment: newComment })  
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' })
    }

  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client as MongoClient, 'comments', {_id: -1})
      res.status(200).json({ comments: documents })

    } catch(error) {
      console.error('error', error)
      res.status(500).json({ message: 'Getting comments failed!' })
    }
    client?.close()

  }


}

export default handler
