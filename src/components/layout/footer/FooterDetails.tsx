import React from "react";
import {
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons/SvgIcons";

const socialLinks = [
  { href: "https://instagram.com", icon: <InstagramIcon /> },
  { href: "https://tiktok.com", icon: <TikTokIcon /> },
  { href: "https://facebook.com", icon: <FacebookIcon /> },
  { href: "https://linkedin.com", icon: <LinkedInIcon /> },
  { href: "https://twitter.com", icon: <TwitterIcon /> },
];

export default function FooterDetails() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-white">Detalles</h2>
      <p className="mb-4">
        Hostabags nacio con la idea que puedas disfrutar tu viaje o paseo libre de cargas.
        Tu vives la aventura, nosotros nos encargamos de tu equipaje.
      </p>
      <div className="flex space-x-4 mb-4">
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            {item.icon}
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-6">
        © 2025 Hostabags.
        <br />
        Condiciones generales | Menciones legales | Política de privacidad |
        Gestión de las cookies
      </p>
    </div>
  );
} 