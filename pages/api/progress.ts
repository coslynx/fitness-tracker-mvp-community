import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ message: 'Goal ID is required' });
  }

  try {
    const progressData = await prisma.workout.findMany({
      where: {
        userId: session.user.id,
        goalId: parseInt(goalId),
      },
      orderBy: {
        date: 'asc',
      },
    });

    const goal = await prisma.goal.findUnique({
      where: {
        id: parseInt(goalId),
      },
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const calculatedProgress = progressData.reduce((acc: any, workout: any) => {
      // ... logic for calculating progress based on goal and workouts
      return acc;
    }, {});

    return res.status(200).json({ progress: calculatedProgress });
  } catch (error) {
    console.error('Error fetching progress data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}