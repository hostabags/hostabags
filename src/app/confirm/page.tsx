'use client';

import { useEffect, useState } from 'react';
import { getBookings } from '@/utils/localStorage';

interface BookingDetails {
  hostId: string;
  dates: string[];
  quantity: number;
  totalPrice: number;
}

export default function ConfirmPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const bookings = getBookings();
    // Get the most recent booking (last one in the array)
    if (bookings && bookings.length > 0) {
      const lastBooking = bookings[bookings.length - 1];
      setBookingDetails(lastBooking);
    }
  }, []);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No booking details found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Booking Confirmation</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Host ID</p>
                <p className="font-medium">{bookingDetails.hostId}</p>
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

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Price</h2>
            <p className="text-2xl font-bold text-blue-600">
              ${bookingDetails.totalPrice?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
