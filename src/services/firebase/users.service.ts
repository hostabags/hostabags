import { DatabaseService } from './database.service';
import { HostsService } from './hosts.service';
import type { User } from '@/types/user';
import type { Host } from '@/types/host';

export interface UserWithHosts extends User {
  hosts: Host[];
}

export class UsersService {
  private static readonly COLLECTION_PATH = 'users';

  //Get all users
  static async getAll(): Promise<User[]> {
    return DatabaseService.getAll<User>(this.COLLECTION_PATH);
  }

  //Get user by ID
  static async getById(id: string): Promise<User | null> {
    return DatabaseService.get<User>(`${this.COLLECTION_PATH}/${id}`);
  }

  //Create a new user
  static async create(userData: Omit<User, 'id'> & { id: string }): Promise<User> {
    return DatabaseService.createWithId<User>(this.COLLECTION_PATH, userData.id, userData);
  }

  //Update user
  static async update(id: string, updates: Partial<User>): Promise<void> {
    return DatabaseService.update<User>(this.COLLECTION_PATH, id, updates);
  }

  //Delete user
  static async delete(id: string): Promise<void> {
    return DatabaseService.delete(this.COLLECTION_PATH, id);
  }

  //Update user role
  static async updateRole(userId: string, newRole: string): Promise<void> {
    return this.update(userId, { role: newRole });
  }

  //Get users with their hosts
  static async getUsersWithHosts(): Promise<UserWithHosts[]> {
    const users = await this.getAll();
    const hosts = await HostsService.getAll();
    
    return users.map(user => ({
      ...user,
      hosts: hosts.filter(host => host.ownerId === user.id)
    }));
  }

  //Get users by role
  static async getByRole(role: string): Promise<User[]> {
    const allUsers = await this.getAll();
    return allUsers.filter(user => user.role === role);
  }

  //Get hosts by user ID
  static async getUserHosts(userId: string): Promise<Host[]> {
    return HostsService.getByOwnerId(userId);
  }

  //Listen to real-time user updates
  static onUserUpdate(
    id: string, 
    callback: (user: User | null) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValue<User>(`${this.COLLECTION_PATH}/${id}`, callback, errorCallback);
  }

    //Listen to real-time updates for all users
  static onUsersUpdate(
    callback: (users: User[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValueCollection<User>(this.COLLECTION_PATH, callback, errorCallback);
  }

  //Listen to real-time updates for users with hosts
  static onUsersWithHostsUpdate(
    callback: (usersWithHosts: UserWithHosts[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    return DatabaseService.onValueCollection<User>(this.COLLECTION_PATH, async (users) => {
      const hosts = await HostsService.getAll();
      const usersWithHosts = users.map(user => ({
        ...user,
        hosts: hosts.filter(host => host.ownerId === user.id)
      }));
      callback(usersWithHosts);
    }, errorCallback);
  }
} 