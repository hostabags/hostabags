'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import { getBookings } from '@/utils/localStorage';
import { database } from '@/config/firebase';
import { ref, push } from 'firebase/database';

interface BookingDetails {
  hostId: string;
  dates: string[];
  quantity: number;
  totalPrice: number;
  hostName: string;
  hostAddress: string;
}

export default function ConfirmPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    const bookings = (getBookings() || []) as BookingDetails[];
    if (bookings && bookings.length > 0) {
      const lastBooking = bookings[bookings.length - 1];
      setBookingDetails(lastBooking);
    } else {
      router.push('/booking');
    }
  }, [user, router]);

  const handleConfirmReservation = async () => {
    if (!user || !bookingDetails) return;

    try {
      // Create booking in Firebase
      const bookingsRef = ref(database, 'bookings');
      await push(bookingsRef, {
        userId: user.uid,
        hostId: bookingDetails.hostId,
        date: bookingDetails.dates[0], // Using first date as the booking date
        luggageCount: bookingDetails.quantity,
        totalPrice: bookingDetails.totalPrice,
        hostName: bookingDetails.hostName,
        hostAddress: bookingDetails.hostAddress,
        createdAt: new Date().toISOString()
      });

      // Clear the booking from localStorage
      localStorage.removeItem('hostabagsBookings');
      
      // Redirect to reserve page
      router.push('/reserve');
    } catch (error) {
      console.error('Error creating booking:', error);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Booking Confirmation</h1>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Host</p>
                  <p className="font-medium">{bookingDetails.hostName}</p>
                  <p className="text-sm text-gray-500">{bookingDetails.hostAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{bookingDetails.quantity}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Selected Dates</h2>
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
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Price</h2>
              <p className="text-2xl font-bold text-blue-600">
                ${bookingDetails.totalPrice?.toFixed(2) || '0.00'}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                onClick={handleConfirmReservation}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
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
