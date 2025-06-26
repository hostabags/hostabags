import { CardStats } from "@/components/user";
import {
  ActiveReservationsIcon,
  CompletedReservationsIcon,
  CancelledReservationsIcon,
} from "@/components/icons/SvgIcons";
import type { User } from "@/types/user";

interface ProfileStatsProps {
  userData: User;
}

export const ProfileStats = ({ userData }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <CardStats
        icon={<ActiveReservationsIcon />}
        text="Reservas Activas"
        reserves={userData.reservesActives || 0}
        bgColor="bg-blue-50"
        iconBgColor="bg-blue-100"
        textColor="text-blue-600"
        numberColor="text-blue-900"
      />

      <CardStats
        icon={<CompletedReservationsIcon />}
        text="Reservas Completadas"
        reserves={userData.reservesDones || 0}
        bgColor="bg-green-50"
        iconBgColor="bg-green-100"
        textColor="text-green-600"
        numberColor="text-green-900"
      />

      <CardStats
        icon={<CancelledReservationsIcon />}
        text="Reservas Canceladas"
        reserves={userData.reservesCancels || 0}
        bgColor="bg-red-50"
        iconBgColor="bg-red-100"
        textColor="text-red-600"
        numberColor="text-red-900"
      />
    </div>
  );
}; 