import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useStore } from '@/store/store';
import { getProgressData } from '@/utils/api';

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const [data, setData] = useState<any[]>([]);
  const { goals } = useStore();
  const goal = goals.find((goal) => goal.id === goalId);

  useEffect(() => {
    const fetchData = async () => {
      if (goal) {
        try {
          const progressData = await getProgressData(goalId);
          setData(progressData);
        } catch (error) {
          console.error('Error fetching progress data:', error);
        }
      }
    };
    fetchData();
  }, [goalId, goal]);

  return (
    <div className="w-full mt-4">
      {data.length > 0 && (
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
      {data.length === 0 && <p className="text-gray-500">No progress data available yet.</p>}
    </div>
  );
};

export default ProgressChart;