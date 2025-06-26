import { PreBookingI } from '@/types/preBooking';

export const saveBooking = (booking: PreBookingI) => {
  localStorage.setItem('hostabagsBookings', JSON.stringify(booking));
};

export const getBookings = (): PreBookingI | null => {
  const bookings = localStorage.getItem('hostabagsBookings');
  return bookings ? JSON.parse(bookings) : null;
};

export const clearBookings = () => {
  localStorage.removeItem('hostabagsBookings');
};