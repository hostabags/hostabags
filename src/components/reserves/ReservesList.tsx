"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";
import type { Booking } from "@/types/booking";
import Button from "../ui/Button/Button";
import { deleteBooking as deleteBookingService } from "@/services/firebaseService";
import useAuth from "@/hooks/useAuth";
import { formatDateMonth } from "@/utils/functions";

export default function ReservesList() {
  const { user } = useAuth();
  const router = useRouter();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    let bookingsUnsubscribe: (() => void) | null = null;

    try {
      const bookingsRef = ref(database, "bookings");
      bookingsUnsubscribe = onValue(bookingsRef, (snapshot) => {
        const allBookings: Booking[] = [];

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          if (key !== null) {
            allBookings.push({ id: key, ...childSnapshot.val() });
          }
        });

        const userBookings = allBookings.filter(
          (booking) => booking.userId === user.uid
        );

        setUserBookings(userBookings);
      });
    } catch (error) {
      console.error("Error subscribing to bookings:", error);
    }

    setLoading(false);

    return () => {
      if (bookingsUnsubscribe) bookingsUnsubscribe();
    };
  }, [user]);


  const deleteBooking = async (
    bookingId: string,
    hostId: string,
    dates: string[]
  ) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      try {
        await deleteBookingService(bookingId, hostId, dates);
        // El estado se actualizará automáticamente gracias al listener de Firebase
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error al eliminar la reserva. Inténtalo de nuevo.");
      }
    }
  };

  if (loading) {
    return (
      <div className="m-8 text-center">
        <p className="text-gray-600">Loading Bookings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="m-8 text-center">
        <p className="text-gray-600 mb-4">
          Please, SignIn to see your bookings
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          SignIn
        </button>
      </div>
    );
  }

  if (userBookings.length === 0) {
    return (
      <main className="m-8">
        <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
        <p className="text-gray-600">You don`t have any active booking</p>
        <button
          onClick={() => router.push("/map-page")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Make a new booking
        </button>
      </main>
    );
  }

  const lastBookingId =
    userBookings.length > 0 ? userBookings[userBookings.length - 1].id : null;

  return (
    <main className="m-8">
      <h1>Your Bookings</h1>
      <div className="container flex flex-col gap-4">
        {userBookings.map((booking) => {
          const { hostName, hostAddress, id, date, totalPrice } = booking;
          const isLast = id === lastBookingId;

          return (
            <div
              key={id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                isLast ? "border-2 border-blue-500" : ""
              }`}
            >
              {isLast && (
                <div className="mb-2">
                  <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Latest booking
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {hostName || "Host no encontrado"}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {hostAddress || "Dirección no disponible"}
                  </p>
                  <div className="space-y-2">
                    <div className="text-gray-700">
                      <span className="font-medium">
                        Reservation dates (days: {`${date.length}`}):
                      </span>
                      <ul className="list-disc list-inside">
                        {Array.isArray(date) ? (
                          date.map((d) => <li key={d}>{formatDateMonth(d)}</li>)
                        ) : (
                          <li>{formatDateMonth(date)}</li>
                        )}
                      </ul>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Number of bags:</span>{" "}
                      {booking.luggageCount}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Total price:</span>
                      {"  "}
                      <span className="font-bold">€{totalPrice}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 w-100">
                  <Button
                    onClick={() => router.push("/map-page")}
                    colorButton="indigo"
                    colorText="white"
                    size="xl"
                  >
                    See map
                  </Button>

                  <Button
                    onClick={() =>
                      deleteBooking(id, booking.hostId, booking.date)
                    }
                    colorButton="red"
                    colorText="white"
                    size="xl"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
