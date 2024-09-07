import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/store';

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { goals } = useStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Fitness Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {session && (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/goals">Goals ({goals.length})</Link>
                </li>
              </>
            )}
            {!session && (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;