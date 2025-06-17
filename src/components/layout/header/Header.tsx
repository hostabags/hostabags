"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./header.scss";

export default function Header() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/signin"); // Redirect to signin after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="header">
      <div className="flex justify-between items-center">
        <div className="logo">
          <Link href="/">HOSTABAGS</Link>
        </div>

        {/* Desktop menu */}
        {role !== "admin" ? (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
            <Link href="/reserve">BOOKINGS</Link>
          </nav>
        ) : (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
            <Link href="/reserve">BOOKINGS</Link>
            <Link href="/dashboard">DASHBOARD</Link>
          </nav>
        )}

        {/* Mobile hamburger button */}
        <button
          className="mobile-menu text-white md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* User actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span>CB</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">Sign-in</Link>
              <Link href="/auth/signup">Sign-up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen &&
        (role !== "admin" ? (
          <nav className="flex flex-col mt-2 space-y-2 md:hidden">
            <Link href="/map-page">MAP</Link>
            <Link href="/reserve">BOOKINGS</Link>
          </nav>
        ) : (
          <nav className="flex flex-col mt-2 space-y-2 md:hidden">
            <Link href="/map-page">MAP</Link>
            <Link href="/reserve">BOOKINGS</Link>
            <Link href="/dashboard">DASHBOARD</Link>
          </nav>
        ))}
    </header>
  );
}
