import React from "react";
import { NewspaperIcon, FaqIcon, BookIcon } from "@/components/icons/SvgIcons";

const resourceLinks = [
  { href: "#", icon: <NewspaperIcon />, label: "Prensa" },
  { href: "#", icon: <FaqIcon />, label: "FAQ" },
  { href: "#", icon: <BookIcon />, label: "Guides" },
];

export default function FooterResources() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3 text-white">
        Recursos
      </h3>
      <ul className="space-y-2">
        {resourceLinks.map((item, idx) => (
          <li key={idx}>
            <a href={item.href} className="hover:text-white transition-colors flex items-center">
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {/* Trustpilot simulado */}
      <div className="mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-xl">★</span>
          <span className="font-semibold text-white">Trustpilot</span>
        </div>
        <div className="flex space-x-1 mt-1">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-green-400 text-2xl">★</span>
          ))}
          <span className="text-green-400 text-2xl">☆</span>
        </div>
        <span className="text-gray-400 text-sm">4.5/5 - 29341 opiniones</span>
      </div>
    </div>
  );
} 