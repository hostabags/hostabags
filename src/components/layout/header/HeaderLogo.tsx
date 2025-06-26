import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../../../public/images/logo-solo.jpg";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 group relative z-10"
    >
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
  );
} 