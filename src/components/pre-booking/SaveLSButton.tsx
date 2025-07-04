import { saveBooking } from "@/utils/localStorage";
import { Host } from "@/types/host";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface Props {
  host: Host;
  quantity: number;
  totalPrice: number;
  calendarNew: string[] | [];
}

export default function SaveLSButton({
  host,
  quantity,
  totalPrice,
  calendarNew,
}: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    try {
      if (!host.id) {
        console.log("host: ", host);
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

      if (!user) {
        router.push("/signin");
        return;
      }

      router.push("/confirm");
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  return (
    <button onClick={handleClick} className="btn w-full mt-4">
      <span>{user ? "Save Booking" : "Sign In to Book"}</span>
    </button>
  );
}
