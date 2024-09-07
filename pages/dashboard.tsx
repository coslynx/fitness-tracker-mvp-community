import { useSession } from 'next-auth/react';
import { useStore } from '@/store/store';
import { getGoals } from '@/utils/api';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';
import SocialShareButton from '@/components/SocialShareButton';

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const { goals: storeGoals, addGoal } = useStore();

  useEffect(() => {
    const fetchGoals = async () => {
      if (session) {
        try {
          const fetchedGoals = await getGoals(session.user.id);
          setGoals(fetchedGoals);
          addGoal(fetchedGoals);
        } catch (error) {
          console.error('Error fetching goals:', error);
        }
      }
    };
    fetchGoals();
  }, [session]);

  const handleGoalInputClose = () => {
    setShowGoalInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Fitness Goals</h1>
          {session && (
            <Button onClick={() => setShowGoalInput(true)}>
              Add New Goal
            </Button>
          )}
        </div>
        {showGoalInput && (
          <GoalInput onClose={handleGoalInputClose} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal: any) => (
            <div
              key={goal.id}
              className="bg-white rounded shadow-md p-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {goal.name}
              </h2>
              <p className="text-gray-600 mb-2">
                Target: {goal.target}
              </p>
              <p className="text-gray-600 mb-2">
                Deadline:{" "}
                {new Date(goal.deadline).toLocaleDateString('en-US')}
              </p>
              <ProgressChart goalId={goal.id} />
              {session && (
                <div className="mt-4">
                  <SocialShareButton platform="facebook" goalId={goal.id} />
                  <SocialShareButton platform="twitter" goalId={goal.id} />
                  <SocialShareButton platform="instagram" goalId={goal.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;