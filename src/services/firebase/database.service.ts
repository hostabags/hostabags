import { ref, get, set, update, remove, push, onValue, off, DataSnapshot } from 'firebase/database';
import { database } from './config';

export interface DatabaseError {
  code: string;
  message: string;
}

export class DatabaseService {
  //Get a single record by path
  static async get<T>(path: string): Promise<T | null> {
    try {
      const dbRef = ref(database, path);
      const snapshot = await get(dbRef);
      
      if (!snapshot.exists()) {
        return null;
      }
      
      return { id: snapshot.key, ...snapshot.val() } as T;
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Get all records from a path
  static async getAll<T>(path: string): Promise<T[]> {
    try {
      const dbRef = ref(database, path);
      const snapshot = await get(dbRef);
      const records: T[] = [];
      
      snapshot.forEach((childSnapshot) => {
        records.push({ id: childSnapshot.key, ...childSnapshot.val() } as T);
      });
      
      return records;
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Create a new record with auto-generated ID
  static async create<T>(path: string, data: Omit<T, 'id'>): Promise<T> {
    try {
      const dbRef = ref(database, path);
      const newRef = await push(dbRef, data);
      const newRecord = { id: newRef.key, ...data } as T;
      
      // Update the record with its ID
      await update(ref(database, `${path}/${newRef.key}`), { id: newRef.key });
      
      return newRecord;
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Create a record with specific ID
  static async createWithId<T>(path: string, id: string, data: Omit<T, 'id'>): Promise<T> {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      const record = { id, ...data } as T;
      await set(dbRef, record);
      return record;
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Update a record
  static async update<T>(path: string, id: string, updates: Partial<T>): Promise<void> {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      await update(dbRef, updates);
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Delete a record
  static async delete(path: string, id: string): Promise<void> {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      await remove(dbRef);
    } catch (error) {
      throw this.handleDatabaseError(error as DatabaseError);
    }
  }

  //Listen to real-time updates
  static onValue<T>(
    path: string, 
    callback: (data: T | null) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot: DataSnapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }
        
        const data = { id: snapshot.key, ...snapshot.val() } as T;
        callback(data);
      },
      (error) => {
        const dbError = this.handleDatabaseError({
          code: (error as any).code || 'UNKNOWN_ERROR',
          message: error.message
        });
        if (errorCallback) {
          errorCallback(dbError);
        } else {
          console.error('Database error:', dbError);
        }
      }
    );

    return unsubscribe;
  }

  //Listen to real-time updates for a collection
  static onValueCollection<T>(
    path: string,
    callback: (data: T[]) => void,
    errorCallback?: (error: Error) => void
  ): () => void {
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot: DataSnapshot) => {
        const records: T[] = [];
        snapshot.forEach((childSnapshot) => {
          records.push({ id: childSnapshot.key, ...childSnapshot.val() } as T);
        });
        callback(records);
      },
      (error) => {
        const dbError = this.handleDatabaseError({
          code: (error as any).code || 'UNKNOWN_ERROR',
          message: error.message
        });
        if (errorCallback) {
          errorCallback(dbError);
        } else {
          console.error('Database error:', dbError);
        }
      }
    );

    return unsubscribe;
  }

  //Handle database errors
  private static handleDatabaseError(error: DatabaseError): Error {
    const errorMessages: { [key: string]: string } = {
      'PERMISSION_DENIED': 'No tienes permisos para realizar esta operación.',
      'UNAVAILABLE': 'El servicio de base de datos no está disponible.',
      'DATA_STALE': 'Los datos están desactualizados.',
      'MAX_RETRIES': 'Se excedió el número máximo de reintentos.',
      'OVERSIZED_PAYLOAD': 'Los datos son demasiado grandes.',
      'WRITE_CANCELED': 'La escritura fue cancelada.',
    };

    const message = errorMessages[error.code] || error.message || 'Error de base de datos desconocido.';
    return new Error(message);
  }
} 