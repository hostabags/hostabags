"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { getBookings } from "@/utils/localStorage";
import { database } from "@/config/firebase";
import { ref, push, update, get } from "firebase/database";
import type { preBooking } from "@/types/preBooking";
import { formatDate } from "@/utils/functions";

export default function ConfirmPage() {
  const [bookingDetails, setBookingDetails] = useState<preBooking | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    const bookings = getBookings();
    if (bookings) {
      setBookingDetails({ ...bookings });
    } else {
      router.push("/map-page");
    }
  }, [user]);

  const handleConfirmReservation = async () => {
    //Validacion si el usario no logueado o no hay datos
    if (!user || !bookingDetails) return;

    try {
      const elementToPush = {
        userId: user.uid,
        hostId: bookingDetails.hostId,
        date: bookingDetails.dates,
        luggageCount: bookingDetails.quantity,
        totalPrice: bookingDetails.totalPrice,
        hostName: bookingDetails.hostName,
        hostAddress: bookingDetails.hostAddress,
        createdAt: formatDate(new Date()),
      };

      // Crear una referencia a la colección 'bookings'
      const bookingsRef = ref(database, "bookings");

      // Usar push() para generar un ID único y guardar el booking
      const newBookingRef = await push(bookingsRef, elementToPush);

      // Actualizar el booking con su ID
      await update(ref(database, `bookings/${newBookingRef.key}`), {
        id: newBookingRef.key,
      });

      // Obtener el host de la base de datos
      const hostRef = ref(database, `hosts/${Number(bookingDetails.hostId) - 1}`);
      const hostSnapshot = await get(hostRef);
      
      if (hostSnapshot.exists()) {
        const hostData = hostSnapshot.val();
        const currentCalendarSelected = hostData.calendarSelected || [];
        
        // Agregar las nuevas fechas al calendario del host
        const updatedCalendarSelected = [...new Set([...currentCalendarSelected, ...bookingDetails.dates])];
        
        // Actualizar el host con las nuevas fechas
        await update(hostRef, {
          calendarSelected: updatedCalendarSelected
        });
      }

      // Una vez confirmada la reserva borrar el localstorage
      localStorage.removeItem("hostabagsBookings");

      // Redirect to reserve page
      router.push("/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (!user) {
    return null;
  }

  if (!bookingDetails) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">No booking details found</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Booking Confirmation
          </h1>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Host</p>
                  <p className="font-medium">{bookingDetails.hostName}</p>
                  <p className="text-sm text-gray-500">
                    {bookingDetails.hostAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bags</p>
                  <p className="font-medium">{bookingDetails.quantity}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Selected Dates
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {bookingDetails.dates && bookingDetails.dates.length > 0 ? (
                    bookingDetails.dates.map((date, index) => (
                      <p key={index} className="text-gray-700">
                        {new Date(date).toLocaleDateString()}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-700">No dates selected</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total days</p>
                  <p className="font-medium">{bookingDetails.dates.length}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Total Price (€3/day)
              </h2>
              <p className="text-2xl font-bold text-blue-600">
                €{bookingDetails.totalPrice?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleConfirmReservation}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8
                rounded-lg text-lg transition-colors duration-200"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
