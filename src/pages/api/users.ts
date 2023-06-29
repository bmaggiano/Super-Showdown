import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
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