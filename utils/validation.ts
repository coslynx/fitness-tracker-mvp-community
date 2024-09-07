import { Goal } from '@/types/goal';
import { Workout } from '@/types/workout';

export const validateGoal = (goal: Goal): string | null => {
  if (!goal.name) {
    return 'Goal name is required';
  }
  if (!goal.target) {
    return 'Goal target is required';
  }
  if (!goal.deadline) {
    return 'Goal deadline is required';
  }
  if (new Date(goal.deadline) < new Date()) {
    return 'Goal deadline must be in the future';
  }
  return null;
};

export const validateWorkout = (workout: Workout): string | null => {
  if (!workout.name) {
    return 'Workout name is required';
  }
  if (!workout.duration) {
    return 'Workout duration is required';
  }
  if (!workout.calories) {
    return 'Workout calories burned is required';
  }
  if (!workout.date) {
    return 'Workout date is required';
  }
  return null;
};