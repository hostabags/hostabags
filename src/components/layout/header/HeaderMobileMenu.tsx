import Link from "next/link";
import { MapPin, Calendar, Settings, Home } from "lucide-react";
import { User } from "firebase/auth";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  user: User | null;
  role: string | null;
  onClose: () => void;
}

export default function HeaderMobileMenu({ 
  isOpen, 
  user, 
  role, 
  onClose 
}: HeaderMobileMenuProps) {
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
    <div
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="py-4 space-y-3 border-t border-gray-700">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 