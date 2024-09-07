import { Goal, CreateGoalInput } from '@/types/goal';
import { Workout } from '@/types/workout';
import { validateGoal } from '@/utils/validation';
import { ShareProgressInput } from '@/types/share-progress';

export const getGoals = async (userId: number): Promise<Goal[]> => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
    });
    return goals;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw new Error('Failed to fetch goals');
  }
};

export const createGoal = async (goalData: CreateGoalInput): Promise<Goal> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const validationError = validateGoal(goalData);
  if (validationError) {
    throw new Error(validationError);
  }

  try {
    const newGoal = await prisma.goal.create({
      data: {
        ...goalData,
        userId: session.user.id,
      },
    });
    return newGoal;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
};

export const getProgressData = async (goalId: number): Promise<Workout[]> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const progressData = await prisma.workout.findMany({
      where: {
        userId: session.user.id,
        goalId,
      },
      orderBy: {
        date: 'asc',
      },
    });
    return progressData;
  } catch (error) {
    console.error('Error fetching progress data:', error);
    throw new Error('Failed to fetch progress data');
  }
};

export const shareProgress = async (
  shareProgressData: ShareProgressInput
): Promise<void> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    // Implement logic to share progress data to the specified social media platform.
    // You can use social media API libraries (e.g., Facebook, Twitter, Instagram) for this purpose.
    // This example just logs the data for demonstration.
    console.log('Sharing progress data:', shareProgressData);
  } catch (error) {
    console.error('Error sharing progress:', error);
    throw new Error('Failed to share progress');
  }
};