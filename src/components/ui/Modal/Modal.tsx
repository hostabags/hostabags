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
    <div className="fixed top-[62px] right-0 bg-white shadow-lg max-w-sm z-[1000] h-[calc(100vh-62px)] overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <CloseButton setSelectedHost={setSelectedHost}>X</CloseButton>
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600">{address}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <PreBooking id={id} />
      </div>
    </div>
  );
}