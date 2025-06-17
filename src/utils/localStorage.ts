import { preBooking } from '@/types/preBooking';

export const saveBooking = (booking: preBooking) => {
  localStorage.setItem('hostabagsBookings', JSON.stringify(booking));
};

export const getBookings = (): preBooking | null => {
  const bookings = localStorage.getItem('hostabagsBookings');
  return bookings ? JSON.parse(bookings) : null;
};

export const clearBookings = () => {
  localStorage.removeItem('hostabagsBookings');
};