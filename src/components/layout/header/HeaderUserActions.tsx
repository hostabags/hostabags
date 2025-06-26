import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";

interface HeaderUserActionsProps {
  user: FirebaseUser | null;
  onLogout: () => void;
}

export default function HeaderUserActions({ user, onLogout }: HeaderUserActionsProps) {
  return (
    <div className="flex items-center space-x-4 relative z-10">
      {user ? (
        <div className="flex items-center space-x-3">
          {/* User Avatar */}
          <Link href="/profile">
            <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1.5">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm font-medium">
                {user.email?.substring(0, 2).toUpperCase()}
              </span>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg group relative"
          >
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Salir</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link
            href="/signin"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg font-medium relative"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
} 