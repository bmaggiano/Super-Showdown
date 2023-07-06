import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allUsers = await prisma.users.findMany({
      orderBy: [{
        score: 'desc'
      }]
    })
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  } finally {
    await prisma.$disconnect();
  }
}