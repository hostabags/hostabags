import { database } from '../config/firebase';
import { ref, get, set, update, remove, push } from 'firebase/database';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Host {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  calendarSelected: string[];
  calendarNew: string[];
}

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

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const usersRef = ref(database, 'users');
  const newUserRef = push(usersRef);
  const newUser = { ...user, id: newUserRef.key! };
  await set(newUserRef, newUser);
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

export const createHost = async (host: Omit<Host, 'id'>): Promise<Host> => {
  const hostsRef = ref(database, 'hosts');
  const newHostRef = push(hostsRef);
  const newHost = { ...host, id: newHostRef.key! };
  await set(newHostRef, newHost);
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