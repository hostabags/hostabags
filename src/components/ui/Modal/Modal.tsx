import { Host } from "@/types/host";
import Calendar from "@/components/calendar/Calendar";
import CloseButton from "../CloseButton/CloseButton";


interface Props {
  id: number;
  name: string;
  address: string;
  setSelectedHost: (host: Host | null) => void;
}

export default function Modal({ id, name, address, setSelectedHost }: Props) {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
      <CloseButton setSelectedHost={setSelectedHost}>X</CloseButton>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{address}</p>

      <Calendar id={id} />

    </div>
  );
}