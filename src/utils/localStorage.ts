export const saveBooking = (hostabagsBookings: {
  hostId: number;
  dates: string[];
  quantity: number;
  totalPrice: number;
}) => {
  const existing = JSON.parse(localStorage.getItem("hostabagsBookings") || "[]");
  localStorage.setItem("hostabagsBookings", JSON.stringify([...existing, hostabagsBookings]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("hostabagsBookings") || "[]");
};