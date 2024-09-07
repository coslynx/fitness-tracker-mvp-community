import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return res.status(200).json(goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    const { name, target, deadline } = req.body;

    if (!name || !target || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newGoal = await prisma.goal.create({
        data: {
          name,
          target,
          deadline,
          userId: session.user.id,
        },
      });
      return res.status(201).json(newGoal);
    } catch (error) {
      console.error("Error creating goal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { id, name, target, deadline } = req.body;

    if (!id || !name || !target || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const updatedGoal = await prisma.goal.update({
        where: {
          id: parseInt(id),
          userId: session.user.id,
        },
        data: {
          name,
          target,
          deadline,
        },
      });
      return res.status(200).json(updatedGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Goal ID is required" });
    }

    try {
      await prisma.goal.delete({
        where: {
          id: parseInt(id),
          userId: session.user.id,
        },
      });
      return res.status(204).json({});
    } catch (error) {
      console.error("Error deleting goal:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}