import { Host } from "@/types/host";
import Calendar from "@/components/reserve/calendar/Calendar";
import CloseButton from "./CloseButton";
import Lugagge from "../luggage/Lugagge";

interface Props {
  name: string;
  address: string;
  setSelectedHost: (host: Host | null) => void;
}

export default function Modal({ name, address, setSelectedHost }: Props) {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
      <CloseButton setSelectedHost={setSelectedHost}>X</CloseButton>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{address}</p>

      <Calendar />
      <Lugagge />
    </div>
  );
}
