export interface Host {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  calendarSelected: string[];
  schedules?: string[];
  description?: string;
  profilePicture?: string;
} 

