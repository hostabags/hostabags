import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  const handleClick = async () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    try {
      if (!host.id) {
        console.error("Host ID is missing");
        return;
      }

      const newConfirmed = host.calendarNew.filter(
        (d) => !host.calendarSelected.includes(d)
      );
      const updatedCalendarSelected = [...host.calendarSelected];
      const updatedHost = {
        ...host,
        calendarSelected: updatedCalendarSelected,
      };

      // Update host calendar
      onConfirm(newConfirmed, updatedHost);

      // Save booking details to localStorage
      saveBooking({
        hostId: host.id,
        dates: host.calendarNew,
        quantity,
        totalPrice,
        hostName: host.name,
        hostAddress: host.address,
      });
      router.push("/confirm");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  return (
    <button onClick={handleClick} className="btn w-full mt-6">
      <span>{user ? "Save Booking" : "Sign In to Book"}</span>
    </button>
  );
}
