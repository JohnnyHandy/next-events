import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDatabase, insertDocument } from '../../helpers/db-util'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = JSON.parse(req.body).email
  if (!userEmail || !userEmail.includes('@')) {
    res.status(422).json({ message: 'Invalid email address' })
    return
  }

  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' })
    return
  }

  try {
    await insertDocument(client, 'newsletter', { email: userEmail })
  } catch (error) {
    console.error('error', error)
    res.status(500).json({ message: 'Inserting data failed!' })
    return
  }

  client.close()

  res.status(201).json({ message: 'Signed up!' })
}

export default handler
