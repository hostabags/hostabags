import { database } from '../config/firebase';
import { ref, get, set, update, remove, push } from 'firebase/database';
import type { Host } from '@/types/host';
import type { Booking } from '@/types/booking';
import type { PreBookingI } from '@/types/preBooking';
import type { User } from '@/types/user';

// Users
export const getUsers = async (): Promise<User[]> => {
  const usersRef = ref(database, 'users');
  const snapshot = await get(usersRef);
  const users: User[] = [];
  snapshot.forEach((childSnapshot) => {
    users.push({ id: childSnapshot.key!, ...childSnapshot.val() });
  });
  return users;
};

export const createUserWithUid = async (uid: string, user: Omit<User, 'id' | 'role'> & { role: string }): Promise<User> => {
  const userRef = ref(database, 'users/' + uid);
  const newUser = { ...user, id: uid };
  await set(userRef, newUser);
  return newUser;
};

// Hosts
export const getHosts = async (): Promise<Host[]> => {
  const hostsRef = ref(database, 'hosts');
  const snapshot = await get(hostsRef);
  const hosts: Host[] = [];
  snapshot.forEach((childSnapshot) => {
    hosts.push({ id: childSnapshot.key!, ...childSnapshot.val() });
  });
  return hosts;
};

export const getHostById = async (id: string): Promise<Host | null> => {
  const hostRef = ref(database, `hosts/${id}`);
  const snapshot = await get(hostRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.key!, ...snapshot.val() };
};

export const createHostWithUid = async (uid: string, host: Omit<Host, 'id'>): Promise<Host> => {
  const hostRef = ref(database, 'hosts/' + uid);
  const newHost = { ...host, id: uid };
  await set(hostRef, newHost);
  return newHost;
};

export const updateHost = async (id: string, updates: Partial<Host>): Promise<void> => {
  const hostRef = ref(database, `hosts/${id}`);
  await update(hostRef, updates);
};

export const deleteHost = async (id: string): Promise<void> => {
  const hostRef = ref(database, `hosts/${id}`);
  await remove(hostRef);
};

// Get bookings
export const getBookings = async (): Promise<Booking[]> => {
  const bookingsRef = ref(database, 'bookings');
  const snapshot = await get(bookingsRef);
  const bookings: Booking[] = [];
  snapshot.forEach((childSnapshot) => {
    bookings.push({ id: childSnapshot.key!, ...childSnapshot.val() });
  });
  return bookings;
};

// Get booking by id
export const getBookingById = async (id: string): Promise<Booking | null> => {
  const bookingRef = ref(database, `bookings/${id}`);
  const snapshot = await get(bookingRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.key!, ...snapshot.val() };
};

export const createBooking = async (
  userId: string, 
  bookingDetails: PreBookingI, 
  createdAt: string
): Promise<Booking> => {
  const elementToPush = {
    userId,
    hostId: bookingDetails.hostId,
    date: bookingDetails.dates,
    luggageCount: bookingDetails.quantity,
    totalPrice: bookingDetails.totalPrice,
    hostName: bookingDetails.hostName,
    hostAddress: bookingDetails.hostAddress,
    createdAt,
  };


  const bookingsRef = ref(database, "bookings");
  const newBookingRef = await push(bookingsRef, elementToPush);
  
  // Agregar el ID al booking
  const newBooking = { ...elementToPush, id: newBookingRef.key! };
  await update(ref(database, `bookings/${newBookingRef.key}`), {
    id: newBookingRef.key,
  });

  return newBooking;
};

export const updateHostCalendar = async (hostId: string, dates: string[]): Promise<void> => {
  const hostRef = ref(database, `hosts/${hostId}`);
  const hostSnapshot = await get(hostRef);

  if (hostSnapshot.exists()) {
    const hostData = hostSnapshot.val();
    const currentCalendarSelected = hostData.calendarSelected || [];

    const updatedCalendarSelected = [
      ...new Set([...currentCalendarSelected, ...dates]),
    ];

    await update(hostRef, {
      calendarSelected: updatedCalendarSelected,
    });
  }
};

export const createBookingAndUpdateHost = async (
  userId: string, 
  bookingDetails: PreBookingI, 
  createdAt: string
): Promise<Booking> => {
  // Crear el booking
  const newBooking = await createBooking(userId, bookingDetails, createdAt);
  
  // Actualizar el calendario del host
  await updateHostCalendar(bookingDetails.hostId, bookingDetails.dates);
  
  return newBooking;
};

export const deleteBooking = async (id: string, hostId: string, dates: string[]): Promise<void> => {
  // Eliminar el booking
  const bookingRef = ref(database, `bookings/${id}`);
  await remove(bookingRef);

  // Actualizar el calendario del host
  const hostRef = ref(database, `hosts/${hostId}`);
  const hostSnapshot = await get(hostRef);

  if (hostSnapshot.exists()) {
    const hostData = hostSnapshot.val();
    const currentCalendarSelected = hostData.calendarSelected || [];

    // Remover las fechas del booking eliminado del calendario
    const updatedCalendarSelected = currentCalendarSelected.filter(
      (date: string) => !dates.includes(date)
    );

    await update(hostRef, {
      calendarSelected: updatedCalendarSelected,
    });
  }
}; 