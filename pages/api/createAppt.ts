import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    try {
        
        const { id , startTime, endTime} = req.body;
    
        if (!id || !startTime ||  !endTime) {
          return res.status(400).json({ message: `Missing fields, got ${req.body}` });
        }

        console.log('Hello', req.body)

    //   const coach = await prisma.coach.findUnique({
    //     where: {id:  parseInt(id)},
    //     include: {
    //       appts : { 
    //         include : {student : true}
    //       }
    //     }
    //   });
      
      res.status(200).json({});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch coach dashboard' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;