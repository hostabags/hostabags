import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  host: Host;
  quantity: number;
  totalPrice: number;
  calendarNew: string[] | [];
}

export default function saveLSButton({
  host,
  quantity,
  totalPrice,
  calendarNew,
}: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
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
