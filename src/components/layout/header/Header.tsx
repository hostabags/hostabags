"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderUserActions from "./HeaderUserActions";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderMobileButton from "./HeaderMobileButton";

export default function Header() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <HeaderLogo />

            {/* Desktop Navigation */}
            <HeaderNavigation user={user} role={role} />

            {/* User Actions */}
            <div className="flex items-center space-x-4 relative z-10">
              <HeaderUserActions user={user} onLogout={handleLogout} />
              
              {/* Mobile Menu Button */}
              <HeaderMobileButton 
                isOpen={isMobileMenuOpen} 
                onToggle={toggleMobileMenu} 
              />
            </div>
          </div>

          {/* Mobile Menu */}
          <HeaderMobileMenu 
            isOpen={isMobileMenuOpen}
            user={user}
            role={role}
            onClose={closeMobileMenu}
          />
        </div>
      </header>

      {/* Spacer to prevent content from going under header */}
      <div className="h-16"></div>
    </>
  );
}
