import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const coaches = await prisma.coach.findMany();
      const students = await prisma.student.findMany();
      res.status(200).json({coaches, students});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch coaches' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;