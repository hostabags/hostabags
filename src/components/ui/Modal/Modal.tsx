import { Host } from "@/types/host";
import PreBooking from "@/components/pre-booking/PreBooking";
import CloseButton from "../CloseButton/CloseButton";


interface Props {
  id: string;
  name: string;
  address: string;
  setSelectedHost: (host: Host | null) => void;
}

export default function Modal({ id, name, address, setSelectedHost }: Props) {
  return (
    <div className="absolute top-[62px] right-0 bg-white p-4 shadow-lg max-w-sm z-[1000] h-full">
      <CloseButton setSelectedHost={setSelectedHost}>X</CloseButton>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-6">{address}</p>

      <PreBooking id={id} />

    </div>
  );
}