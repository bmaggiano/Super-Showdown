// pages/api/superheroApi.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const heroArr: any[] = []
  
  try {
    
    for(let i=0; i<3; i++){
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

        if (data.powerstats.intelligence !== null && data.image.url !== null
          && !heroArr.some((hero) => hero.id === data.id)) {
          heroArr.push(data);
        }
      }
      else {
        res.status(response.status).json({ error: 'Request failed' });
      }
    } 
    console.log(heroArr)
    res.status(200).json(heroArr);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
