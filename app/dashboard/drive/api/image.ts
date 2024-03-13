// pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cloudName: string = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const fetchUrl: string = `https://res.cloudinary.com/${cloudName}/image/list/your_tag.json`; // Remplacez 'your_tag' par votre propre tag

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    res.status(200).json(data.resources);
  } catch (error) {
    console.error('Failed to fetch images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
}
