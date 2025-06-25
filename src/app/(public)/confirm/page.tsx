"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { getBookings } from "@/utils/localStorage";
import { createBookingAndUpdateHost } from "@/services/firebaseService";
import type { PreBookingI } from "@/types/preBooking";
import { formatDate } from "@/utils/functions";
import Button from "@/components/ui/Button/Button";
import useAuth from "@/hooks/useAuth";

export default function ConfirmPage() {
  const [bookingDetails, setBookingDetails] = useState<PreBookingI | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }

    const bookings = getBookings();
    if (bookings) {
      setBookingDetails({ ...bookings });
    } else {
      router.push("/map-page");
    }
  }, [user, router]);

  const handleConfirmReservation = async () => {
    if (!user || !bookingDetails) return;
    try {
      await createBookingAndUpdateHost(
        user.uid,
        bookingDetails,
        formatDate(new Date())
      );

      localStorage.removeItem("hostabagsBookings");
      router.push("/bookings");

    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleCancelReservation = () => {
    if (!user || !bookingDetails) return;
    try {
      localStorage.removeItem("hostabagsBookings");
      router.push("/map-page");
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

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
              <Button
                onClick={handleConfirmReservation}
                colorButton="green"
                colorText="white"
                size="xl"
              >
                Confirm Booking
              </Button>
              <Button
                onClick={handleCancelReservation}
                colorButton="red"
                colorText="white"
                size="xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
