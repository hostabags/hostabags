import { DatabaseService } from './database.service';
import type { Host } from '@/types/host';

export class HostsService {
  private static readonly COLLECTION_PATH = 'hosts';

  //Get all hosts
  static async getAll(): Promise<Host[]> {
    return DatabaseService.getAll<Host>(this.COLLECTION_PATH);
  }

  //Get host by ID
  static async getById(id: string): Promise<Host | null> {
    return DatabaseService.get<Host>(`${this.COLLECTION_PATH}/${id}`);
  }

  //Get hosts by owner ID
  static async getByOwnerId(ownerId: string): Promise<Host[]> {
    const allHosts = await this.getAll();
    return allHosts.filter(host => host.ownerId === ownerId);
  }

  //Create a new host
  static async create(hostData: Omit<Host, 'id'>): Promise<Host> {
    return DatabaseService.create<Host>(this.COLLECTION_PATH, hostData);
  }

  //Create host with specific ID (for migration purposes)
  static async createWithId(id: string, hostData: Omit<Host, 'id'>): Promise<Host> {
    return DatabaseService.createWithId<Host>(this.COLLECTION_PATH, id, hostData);
  }

  //Update host
  static async update(id: string, updates: Partial<Host>): Promise<void> {
    return DatabaseService.update<Host>(this.COLLECTION_PATH, id, updates);
  }

  //Delete host
  static async delete(id: string): Promise<void> {
    return DatabaseService.delete(this.COLLECTION_PATH, id);
  }

  //Update host calendar
  static async updateCalendar(hostId: string, dates: string[]): Promise<void> {
    const host = await this.getById(hostId);
    if (!host) {
      throw new Error('Host no encontrado');
    }

    const currentCalendar = host.calendarSelected || [];
    const updatedCalendar = [...new Set([...currentCalendar, ...dates])];

    await this.update(hostId, { calendarSelected: updatedCalendar });
  }

  //Remove dates from host calendar
  static async removeFromCalendar(hostId: string, dates: string[]): Promise<void> {
    const host = await this.getById(hostId);
    if (!host) {
      throw new Error('Host no encontrado');
    }

    const currentCalendar = host.calendarSelected || [];
    const updatedCalendar = currentCalendar.filter(date => !dates.includes(date));

    await this.update(hostId, { calendarSelected: updatedCalendar });
  }

  //Listen to real-time host updates
  static onHostUpdate(id: string, callback: (host: Host | null) => void): () => void {
    return DatabaseService.onValue<Host>(`${this.COLLECTION_PATH}/${id}`, callback);
  }

    //Listen to real-time updates for all hosts
  static onHostsUpdate(callback: (hosts: Host[]) => void): () => void {
    return DatabaseService.onValueCollection<Host>(this.COLLECTION_PATH, callback);
  }

  //Listen to real-time updates for hosts by owner
  static onHostsByOwnerUpdate(ownerId: string, callback: (hosts: Host[]) => void): () => void {
    return DatabaseService.onValueCollection<Host>(this.COLLECTION_PATH, (allHosts) => {
      const ownerHosts = allHosts.filter(host => host.ownerId === ownerId);
      callback(ownerHosts);
    });
  }
} 