import { useSession } from "next-auth/react";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const { user, setUser } = useStore();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">Fitness Tracker</h1>
        <p className="text-gray-600 text-center mb-8">
          Track your progress, set goals, and stay motivated with our fitness
          community.
        </p>
        {!session && (
          <div className="space-y-4">
            <Link href="/login">
              <Button type="primary" size="large">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button type="secondary" size="large">
                Register
              </Button>
            </Link>
          </div>
        )}
        {session && (
          <div className="text-center">
            <p>Welcome, {user?.name}!</p>
            <Link href="/dashboard">
              <Button type="primary" size="large">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;