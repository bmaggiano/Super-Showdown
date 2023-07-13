// pages/api/opponent.ts
import { NextApiRequest, NextApiResponse } from 'next';

// API call to get a random opponent from the superhero API

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let opponent = null;

    while (!opponent) {
      const randomNumber = Math.floor(Math.random() * 731) + 1;
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

        if (
          data.powerstats.intelligence !== 'null' &&
          data.powerstats.strength !== 'null' &&
          data.powerstats.speed !== 'null' &&
          data.powerstats.durability !== 'null' &&
          data.powerstats.power !== 'null' &&
          data.powerstats.combat !== 'null' &&
          data.image.url !== null
        ) {
          opponent = data;
        }
      } else {
        res.status(response.status).json({ error: 'Request failed' });
        break; // Stop the loop if the request fails
      }
    }

    res.status(200).json(opponent);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
