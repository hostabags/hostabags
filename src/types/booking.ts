export interface Booking {
  id: string;
  userId: string;
  hostId: string;
  date: string[];
  luggageCount: number;
  totalPrice: number;
  hostName: string;
  hostAddress: string;
  createdAt: string;
}