export interface User {
  id: string;
  email: string;
  role?: string;
  phone?: string;
  name?: string;
  surname?: string;
  reservesActives?: number;
  reservesDones?: number;
  reservesCancels?: number;
}
