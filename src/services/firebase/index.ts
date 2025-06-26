// Configuration
export { firebaseConfig, auth, database } from './config';

// Core services
export { AuthService } from './auth.service';
export { DatabaseService } from './database.service';

// Domain-specific services
export { HostsService } from './hosts.service';
export { UsersService } from './users.service';
export { BookingsService } from './bookings.service';

// Types
export type { AuthError } from './auth.service';
export type { DatabaseError } from './database.service';
export type { UserWithHosts } from './users.service'; 