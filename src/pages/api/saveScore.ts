import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// API call to save a users score where the email matches with that of the req body

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { score, email } = req.body;
  
    try {
      // Update the score for the current user in the database using Prisma
      const updatedUser = await prisma.users.update({
        where: {
          email: email,
        },
        data: {
          score,
        },
      });
  
      return res.status(200).json({ message: 'Score saved successfully', user: updatedUser });
    } catch (error) {
      console.error('Error saving score:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
