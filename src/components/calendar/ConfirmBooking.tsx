
import { Check } from "lucide-react";
import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";

export default function ConfirmBooking({
  host,
  quantity,
  totalPrice,
  onConfirm,
}: {
  host: Host;
  quantity: number;
  totalPrice: number;
  onConfirm: (confirmedDates: string[], updatedHost: Host) => void;
}) {
  const handleClick = () => {
    const newConfirmed = host.calendarNew.filter(
      (d) => !host.calendarSelected.includes(d)
    );
    const updatedCalendarSelected = [
      ...host.calendarSelected,
      ...newConfirmed,
    ];
    const updatedHost = {
      ...host,
      calendarSelected: updatedCalendarSelected,
      calendarNew: [],
    };
    onConfirm(newConfirmed, updatedHost);

    saveBooking({
      hostId: host.id,
      dates: newConfirmed,
      quantity,
      totalPrice,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
    >
      <Check className="h-5 w-5" />
      <span>Save Booking</span>
    </button>
  );
}
