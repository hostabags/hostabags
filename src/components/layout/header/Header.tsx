"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./header.scss";
import SignButton from "@/components/ui/SignButton/SignButton";

export default function Header() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/signin");
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
        {!user ? (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
          </nav>
        ) : role === "admin" ? (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
            <Link href="/bookings">BOOKINGS</Link>
            <Link href="/dashboard">DASHBOARD</Link>
          </nav>
        ) : (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
            <Link href="/bookings">BOOKINGS</Link>
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
            <div>
              <span className="bg-white text-black mx-2 py-1 px-2 font-bold rounded-full">
                {user.email?.substring(0, 2).toUpperCase()}
              </span>

              <SignButton
                onClick={handleLogout}
                colorButton="red"
                colorText="white"
              >
                Logout
              </SignButton>
            </div>
          ) : (
            <div>
              <SignButton colorButton="indigo" colorText="white">
                <Link href="/auth/signin">Sign in</Link>
              </SignButton>

              <SignButton colorButton="indigo" colorText="white">
                <Link href="/auth/signup">Sign up</Link>
              </SignButton>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen &&
        (!user ? (
          <nav className="nav-links">
            <Link href="/map-page">MAP</Link>
          </nav>
        ) : role === "admin" ? (
          <nav className="flex flex-col mt-2 space-y-2 md:hidden">
            <Link href="/map-page">MAP</Link>
            <Link href="/bookings">BOOKINGS</Link>
            <Link href="/dashboard">DASHBOARD</Link>
          </nav>
        ) : (
          <nav className="flex flex-col mt-2 space-y-2 md:hidden">
            <Link href="/map-page">MAP</Link>
            <Link href="/bookings">BOOKINGS</Link>
          </nav>
        ))}
    </header>
  );
}
