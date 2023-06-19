// pages/api/superheroApi.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const randomNumber = Math.floor(Math.random() * 731) + 1;

  try {
    const response = await fetch(
      `https://superheroapi.com/api/6332922990107582/${randomNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: 'Request failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
