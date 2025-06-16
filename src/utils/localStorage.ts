import { BookingDetails } from '@/types/preBooking';

export const saveBooking = (booking: BookingDetails) => {
  localStorage.setItem('hostabagsBookings', JSON.stringify(booking));
};

export const getBookings = (): BookingDetails | null => {
  const bookings = localStorage.getItem('hostabagsBookings');
  return bookings ? JSON.parse(bookings) : null;
};

export const clearBookings = () => {
  localStorage.removeItem('hostabagsBookings');
};