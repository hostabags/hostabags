import { Menu, X } from "lucide-react";

interface HeaderMobileButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function HeaderMobileButton({ isOpen, onToggle }: HeaderMobileButtonProps) {
  return (
    <button
      className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200 relative"
      onClick={onToggle}
      aria-label="Toggle mobile menu"
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );
} 