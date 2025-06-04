import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
      router.push('/auth/signin');
      return;
    }

    try {
      const newConfirmed = host.calendarNew.filter(
        (d) => !host.calendarSelected.includes(d)
      );
      const updatedCalendarSelected = [...host.calendarSelected];
      const updatedHost = {
        ...host,
        calendarSelected: updatedCalendarSelected,
      };
     
      // Update host calendar
      await onConfirm(newConfirmed, updatedHost);

      // Save booking details to localStorage
      saveBooking({
        hostId: host.id,
        dates: host.calendarNew,
        quantity,
        totalPrice,
        hostName: host.name,
        hostAddress: host.address,
      });
console.log("hola");
      router.push('/confirm');
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn w-full mt-6"
    >
      <span>{user ? 'Save Booking' : 'Sign In to Book'}</span>
    </button>
  );
}
