import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API call using chat-gpt-3.5 turbo with a prompt from the request body

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a comic book expert." },
        { "role": "user", "content": prompt },
      ],
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    });

    const result = completion.data.choices[0].message?.content;

    // Send the response using `res`
    res.status(200).json({ response: result }); 

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
