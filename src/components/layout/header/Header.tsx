"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./header.scss";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import LogoImage from "../../../../public/images/logo-solo.jpg";
import Navbar from "./Navbar";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="header">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex gap-4 items-center">
            <Image
              src={LogoImage}
              alt="HostaBags logo"
              className="rounded-sm shadow-lg"
              width={30}
            />
            <span>Hostabags</span>
          </div>
        </Link>

        {/* Desktop menu */}
        <Navbar user={user} role={role} />

        {/* Mobile hamburger button */}
        <button
          className="mobile-menu text-white md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Log actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div>
              <span className="bg-white text-black mx-2 py-1 px-2 font-bold rounded-full">
                {user.email?.substring(0, 2).toUpperCase()}
              </span>

              <Button
                onClick={handleLogout}
                colorButton="red"
                colorText="white"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button colorButton="indigo" colorText="white">
                <Link href="/signin">Sign in</Link>
              </Button>

              <Button colorButton="indigo" colorText="white">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && <Navbar user={user} role={role} isMobile />}
    </header>
  );
}
