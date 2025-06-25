import { useState, useEffect } from "react";
import { BookingsService } from "@/services/firebase";
import type { Booking } from "@/types/booking";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = BookingsService.onBookingsUpdate(
      (bookings) => {
        setBookings(bookings);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { bookings, loading, error };
}

export function useUserBookings(userId: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const unsubscribe = BookingsService.onUserBookingsUpdate(
      userId,
      (bookings) => {
        setBookings(bookings);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  return { bookings, loading, error };
}

export function useHostBookings(hostId: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hostId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const unsubscribe = BookingsService.onHostBookingsUpdate(
      hostId,
      (bookings) => {
        setBookings(bookings);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [hostId]);

  return { bookings, loading, error };
} 