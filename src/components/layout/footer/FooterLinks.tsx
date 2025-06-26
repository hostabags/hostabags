import React from "react";
import { HandshakeIcon, LocationIcon, LinkIcon, StarIcon } from "@/components/icons/SvgIcons";

const usefulLinks = [
  { href: "#", icon: <HandshakeIcon />, label: "Se un socio" },
  { href: "#", icon: <LocationIcon />, label: "Todas las ciudades" },
  { href: "#", icon: <LinkIcon />, label: "Afiliación" },
  { href: "#", icon: <StarIcon />, label: "Opiniones" },
];

export default function FooterLinks() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3 text-white">
        Enlaces útiles
      </h3>
      <ul className="space-y-2">
        {usefulLinks.map((item, idx) => (
          <li key={idx}>
            <a href={item.href} className="hover:text-white transition-colors flex items-center">
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 