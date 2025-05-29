'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getBookings } from '@/utils/localStorage';

interface Booking {
  id: string;
  userId: string;
  hostId: string;
  date: string;  // Changed back to single date to match JSON server
  luggageCount: number;
}

interface Host {
  id: string;
  name: string;
  address: string;
}

export default function Reserve() {
  const { user } = useAuth();
  const router = useRouter();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [hosts, setHosts] = useState<{ [key: string]: Host }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user) return;

      try {
        // Fetch all bookings
        const bookingsResponse = await fetch('http://localhost:3001/bookings');
        const allBookings: Booking[] = await bookingsResponse.json();
        
        // Filter bookings for current user
        const userBookings = allBookings.filter(booking => booking.userId === user.uid);
        setUserBookings(userBookings);

        // Fetch hosts data for the bookings
        const hostsResponse = await fetch('http://localhost:3001/hosts');
        const allHosts: Host[] = await hostsResponse.json();
        
        // Create a map of host IDs to host data
        const hostsMap = allHosts.reduce((acc, host) => {
          acc[host.id] = host;
          return acc;
        }, {} as { [key: string]: Host });
        
        setHosts(hostsMap);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user]);

  const handleConfirmReservation = async () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    try {
      const bookings = getBookings();
      if (bookings && bookings.length > 0) {
        const lastBooking = bookings[bookings.length - 1];
        
        // Create booking in JSON server
        const response = await fetch('http://localhost:3001/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.uid,
            hostId: lastBooking.hostId,
            date: lastBooking.dates[0],  // Use first date as the booking date
            luggageCount: lastBooking.quantity
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create booking');
        }

        // Clear the booking from localStorage
        localStorage.removeItem('hostabagsBookings');
        
        // Refresh the bookings list
        const updatedBookingsResponse = await fetch('http://localhost:3001/bookings');
        const allBookings: Booking[] = await updatedBookingsResponse.json();
        setUserBookings(allBookings.filter(booking => booking.userId === user.uid));
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
        <p className="text-gray-600 mb-4">Please, SignIn to see your bookings</p>
        <button 
          onClick={() => router.push('/auth/signin')}
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
          onClick={() => router.push('/booking')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Make a new booking
        </button>
      </main>
    );
  }

  return (
    <main className="m-8">
      <h1 >Your Bookings</h1>
      <div className="space-y-6">
        {userBookings.map((booking) => {
          const host = hosts[booking.hostId];
          return (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{host?.name || 'Host no encontrado'}</h3>
                  <p className="text-gray-600 mb-2">{host?.address || 'Dirección no disponible'}</p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Reservation dates:</span> {formatDate(booking.date)}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Number of bags:</span> {booking.luggageCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button 
                    onClick={() => router.push('/booking')}
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
