import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { studentId, apptId } = req.body;

      if (!studentId || !apptId) {
        return res
          .status(400)
          .json({ message: `Missing fields, got ${req.body}` });
      }

      const appt = await prisma.appt.update({
        where: { id: apptId }, // Find the appointment by ID
        data: {
          student: {
            connect: { id: studentId }, // Connect the student to the appointment
          },
        },
      });

      res.status(200).json({ message: "Updated Appt", appt: appt });
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
