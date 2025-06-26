import Link from "next/link";
import { MapPin, Calendar, Settings, Home } from "lucide-react";
import { User } from "firebase/auth";

interface HeaderNavigationProps {
  user: User | null;
  role: string | null;
}

export default function HeaderNavigation({ user, role }: HeaderNavigationProps) {
  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [{ href: "/map-page", label: "Mapa", icon: MapPin }];

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
      return [...userItems, { href: "/host", label: "Host", icon: Home }];
    }

    return userItems;
  };

  const navItems = getNavItems();

  return (
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
  );
} 