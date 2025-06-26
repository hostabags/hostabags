import { DatabaseService } from './database.service';
import { HostsService } from './hosts.service';
import type { Booking } from '@/types/booking';
import type { PreBookingI } from '@/types/preBooking';

export class BookingsService {
  private static readonly COLLECTION_PATH = 'bookings';

  //Get all bookings
  static async getAll(): Promise<Booking[]> {
    return DatabaseService.getAll<Booking>(this.COLLECTION_PATH);
  }

  //Get booking by ID
  static async getById(id: string): Promise<Booking | null> {
    return DatabaseService.get<Booking>(`${this.COLLECTION_PATH}/${id}`);
  }

  //Get bookings by user ID
  static async getByUserId(userId: string): Promise<Booking[]> {
    const allBookings = await this.getAll();
    return allBookings.filter(booking => booking.userId === userId);
  }

  //Get bookings by host ID
  static async getByHostId(hostId: string): Promise<Booking[]> {
    const allBookings = await this.getAll();
    return allBookings.filter(booking => booking.hostId === hostId);
  }

  //Create a new booking
  static async create(bookingData: Omit<Booking, 'id'>): Promise<Booking> {
    return DatabaseService.create<Booking>(this.COLLECTION_PATH, bookingData);
  }

  //Update booking
  static async update(id: string, updates: Partial<Booking>): Promise<void> {
    return DatabaseService.update<Booking>(this.COLLECTION_PATH, id, updates);
  }

  //Delete booking
  static async delete(id: string): Promise<void> {
    return DatabaseService.delete(this.COLLECTION_PATH, id);
  }

  //Create booking and update host calendar
  static async createBookingAndUpdateHost(
    userId: string,
    bookingDetails: PreBookingI,
    createdAt: string
  ): Promise<Booking> {
    // Create the booking
    const bookingData: Omit<Booking, 'id'> = {
      userId,
      hostId: bookingDetails.hostId,
      date: bookingDetails.dates,
      luggageCount: bookingDetails.quantity,
      totalPrice: bookingDetails.totalPrice,
      hostName: bookingDetails.hostName,
      hostAddress: bookingDetails.hostAddress,
      createdAt,
    };

    const newBooking = await this.create(bookingData);

    // Update host calendar
    await HostsService.updateCalendar(bookingDetails.hostId, bookingDetails.dates);

    return newBooking;
  }

  //Delete booking and update host calendar
  static async deleteBookingAndUpdateHost(
    bookingId: string,
    hostId: string,
    dates: string[]
  ): Promise<void> {
    // Delete the booking
    await this.delete(bookingId);

    // Update host calendar
    await HostsService.removeFromCalendar(hostId, dates);
  }

  //Listen to real-time booking updates
  static onBookingUpdate(
    id: string, 
    callback: (booking: Booking | null) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValue<Booking>(`${this.COLLECTION_PATH}/${id}`, callback, errorCallback);
  }

    //Listen to real-time updates for all bookings
  static onBookingsUpdate(
    callback: (bookings: Booking[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValueCollection<Booking>(this.COLLECTION_PATH, callback, errorCallback);
  }

  //Listen to real-time updates for user bookings
  static onUserBookingsUpdate(
    userId: string, 
    callback: (bookings: Booking[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValueCollection<Booking>(this.COLLECTION_PATH, (allBookings) => {
      const userBookings = allBookings.filter(booking => booking.userId === userId);
      callback(userBookings);
    }, errorCallback);
  }

  //Listen to real-time updates for host bookings
  static onHostBookingsUpdate(
    hostId: string, 
    callback: (bookings: Booking[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValueCollection<Booking>(this.COLLECTION_PATH, (allBookings) => {
      const hostBookings = allBookings.filter(booking => booking.hostId === hostId);
      callback(hostBookings);
    }, errorCallback);
  }
} 