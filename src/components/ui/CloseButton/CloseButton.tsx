import { Host } from "@/types/host";

interface Props {
    setSelectedHost: (host: Host | null) => void;   
    children: React.ReactNode;
}

export default function CloseButton({setSelectedHost, children}: Props) {
  return (
    <button
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-gray-100 p-2
    rounded-full border border-gray-300 h-8 w-8 flex items-center justify-center cursor-pointer"
      onClick={() => setSelectedHost(null)}
    >
      {children}
    </button>
  );
}
