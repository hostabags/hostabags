import Link from "next/link";
import React from "react";

interface NavbarProps {
  user: any;
  role: string | null;
  isMobile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, role, isMobile = false }) => {
  // Define las clases para el nav según si es mobile o desktop
  const navClass = isMobile
    ? "flex flex-col mt-2 space-y-2 md:hidden"
    : "nav-links";

  if (!user) {
    return (
      <nav className={navClass}>
        <Link href="/map-page">MAP</Link>
      </nav>
    );
  }

  if (role === "admin") {
    return (
      <nav className={navClass}>
        <Link href="/map-page">MAP</Link>
        <Link href="/bookings">BOOKINGS</Link>
        <Link href="/dashboard">DASHBOARD</Link>
      </nav>
    );
  }

  return (
    <nav className={navClass}>
      <Link href="/map-page">MAP</Link>
      <Link href="/bookings">BOOKINGS</Link>
    </nav>
  );
};

export default Navbar; 