"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, MapPin, Calendar, Home, Settings } from "lucide-react";
import Image from "next/image";
import LogoImage from "../../../../public/images/logo-solo.jpg";
import useAuth from "@/hooks/useAuth";

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { href: "/map-page", label: "Mapa", icon: MapPin },
    ];

    if (!user) return baseItems;

    const userItems = [
      ...baseItems,
      { href: "/bookings", label: "Reservas", icon: Calendar },
    ];

    if (role === "admin") {
      return [
        ...userItems,
        { href: "/dashboard", label: "Dashboard", icon: Settings },
      ];
    }

    if (role === "host") {
      return [
        ...userItems,
        { href: "/host", label: "Host", icon: Home },
      ];
    }

    return userItems;
  };

  const navItems = getNavItems();

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10">
              <div className="relative">
                <Image
                  src={LogoImage}
                  alt="HostaBags logo"
                  className="rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-white font-bold text-xl tracking-wide group-hover:text-indigo-300 transition-colors duration-300">
                HostaBags
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 relative z-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group relative"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4 relative z-10">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1.5">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm font-medium">
                      {user.email?.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
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

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 relative"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="py-4 space-y-3 border-t border-gray-700">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg transition-all duration-200 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content from going under header */}
      <div className="h-16"></div>
    </>
  );
}
