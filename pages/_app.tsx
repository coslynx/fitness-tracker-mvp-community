import { SessionProvider } from 'next-auth/react';
import { StoreProvider } from '@/store/store';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getGoals } from '@/utils/api';
import { useSession } from 'next-auth/react';

const MyApp: React.FC<{ Component: React.ComponentType }> = ({ Component, pageProps }) => {
  const [goals, setGoals] = useState([]);
  const { data: session } = useSession();
  const { addGoal } = useStore();

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

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout goals={goals}>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
};

export default MyApp;