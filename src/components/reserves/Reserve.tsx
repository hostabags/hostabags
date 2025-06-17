"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";
import type { Host } from "@/types/host";
import type { Booking } from "@/types/booking";

export default function Reserve() {
  const { user } = useAuth();
  const router = useRouter();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [hosts, setHosts] = useState<{ [key: string]: Host }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    let bookingsUnsubscribe: (() => void) | null = null;
    let hostsUnsubscribe: (() => void) | null = null;

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

    try {
      const hostsRef = ref(database, "hosts");
      hostsUnsubscribe = onValue(hostsRef, (snapshot) => {
        const hosts: { [key: string]: Host } = {};

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          if (key !== null) {
            hosts[key] = childSnapshot.val();
          }
        });

        setHosts(hosts);
      });
    } catch (error) {
      console.error("Error subscribing to hosts:", error);
    }

    setLoading(false);

    return () => {
      if (bookingsUnsubscribe) bookingsUnsubscribe();
      if (hostsUnsubscribe) hostsUnsubscribe();
    };
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          onClick={() => router.push("/auth/signin")}
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
      <div className="space-y-6">
        {userBookings.map((booking) => {
          const {hostName, hostAddress, id, date, totalPrice} = booking;
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
                      <span className="font-medium">Reservation dates (days: {`${date.length}`}):</span>
                      <ul className="list-disc list-inside">
                        {Array.isArray(date) ? (
                          date.map((d) => (
                            <li key={d}>{formatDate(d)}</li>
                          ))
                        ) : (
                          <li>{formatDate(date)}</li>
                        )}
                      </ul>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Number of bags:</span>{" "}
                      {booking.luggageCount}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Total price:</span>{"  "}
                      <span className="font-bold">€{totalPrice}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => router.push("/map-page")}
                    className="btn"
                  >
                    See map
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
