import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  host: Host;
  quantity: number;
  totalPrice: number;
  calendarNew: string[] | [];
  // onConfirm: (updatedHost: Host, confirmedDates: string[]) => void;
}

export default function ConfirmBooking({
  host,
  quantity,
  totalPrice,
  calendarNew,
  // onConfirm,
}: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = async () => {
    // Si no hay un usiario autenticado va a la pagina de signin
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    try {
      if (!host.id) {
        console.log("host: ", host)
        console.error("Host ID is missing");
        return;
      }

      const newConfirmed = calendarNew.filter(
        (d) => !host.calendarSelected.includes(d)
      );
      const updatedCalendarSelected = [...host.calendarSelected];
      const updatedHost = {
        ...host,
        calendarSelected: updatedCalendarSelected,
      };

      // Update host calendar
      // onConfirm(updatedHost, newConfirmed);

      // Save booking details to localStorage
      saveBooking({
        hostId: host.id,
        dates: calendarNew,
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
