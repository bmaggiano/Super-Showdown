import { PrismaClient, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// API call to save a user's info into our db
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, score, image } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Invalid name or email' });
  }

  try {
    // Save the name to the database using Prisma
    await prisma.users.create({
      data: {
        name,
        email,
        score,
        image,
      },
    });

    return res.status(200).json({ message: 'Name saved successfully' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      // Name already exists in the database
      return res.status(200).json({ message: 'Name already exists' });
    } else {
      console.error('Error saving name:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
