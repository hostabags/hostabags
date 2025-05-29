import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";

interface Props {
  host: Host;
  quantity: number;
  totalPrice: number;
  onConfirm: (confirmedDates: string[], updatedHost: Host) => void;
}

export default function ConfirmBooking({
  host,
  quantity,
  totalPrice,
  onConfirm,
}: Props) {
  const router = useRouter();
  
  const handleClick = () => {
    const newConfirmed = host.calendarNew.filter(
      (d) => !host.calendarSelected.includes(d)
    );
    const updatedCalendarSelected = [...host.calendarSelected];
    const updatedHost = {
      ...host,
      calendarSelected: updatedCalendarSelected,
    };
    onConfirm(newConfirmed, updatedHost);

    saveBooking({
      hostId: host.id,
      dates: newConfirmed,
      quantity,
      totalPrice,
    });

    router.push('/confirm');
  };

  return (
    <button
      onClick={handleClick}
      className="btn w-full mt-6"
    >
      <span>Save Booking</span>
    </button>
  );
}
