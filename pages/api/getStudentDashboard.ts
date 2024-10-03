import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      console.log(req.body);

      if (!id) {
        return res.status(400).json({ message: "Id is required" });
      }

      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
        include: {
          appts: {
            include: { coach: true },
          },
        },
      });

      const availableAppts = await prisma.appt.findMany({
        where: { student: null },
        include: {
          coach: true,
        },
      });

      res.status(200).json({ student, available: availableAppts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch coach dashboard" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
