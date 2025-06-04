export interface BookingDetails {
  length: number;
  hostId: string;
  dates: string[];
  quantity: number;
  totalPrice: number;
  hostName: string;
  hostAddress: string;
}

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