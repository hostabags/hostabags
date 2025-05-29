'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/signin'); // Redirect to signin after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold"><Link href="/">LOGO HOSTABAGS</Link></div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/booking" className="hover:text-gray-300">MAPA</Link>
          </li>
          <li>
            <Link href="/reserve" className="hover:text-gray-300">RESERVAS</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-gray-300">DASHBOARD</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="">CB</span> {/* Placeholder for user initial/icon */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="hover:text-gray-300">Signin</Link>
            <Link href="/auth/signup" className="hover:text-gray-300">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
