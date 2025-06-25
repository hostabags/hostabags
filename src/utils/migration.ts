import { database } from '@/config/firebase';
import { ref, get, set, remove } from 'firebase/database';
import type { Host } from '@/types/host';

/**
 * Script de migración para convertir hosts existentes a la nueva estructura
 * donde hosts tienen IDs independientes y están vinculados a usuarios por ownerId
 */
export const migrateHostsToNewStructure = async (): Promise<void> => {
  try {
    console.log('Iniciando migración de hosts...');
    
    // Obtener todos los hosts existentes
    const hostsRef = ref(database, 'hosts');
    const snapshot = await get(hostsRef);
    
    if (!snapshot.exists()) {
      console.log('No hay hosts para migrar');
      return;
    }

    const hostsToMigrate: { [key: string]: any } = {};
    snapshot.forEach((childSnapshot) => {
      const hostData = childSnapshot.val();
      const hostId = childSnapshot.key!;
      
      // Verificar si el host ya tiene la nueva estructura
      if (hostData.ownerId) {
        console.log(`Host ${hostId} ya tiene la nueva estructura, saltando...`);
        return;
      }
      
      // Si el host no tiene ownerId, asumimos que el ID del host es el mismo que el del usuario
      hostsToMigrate[hostId] = {
        ...hostData,
        ownerId: hostId, // El ID del host se convierte en el ownerId
        id: hostId
      };
    });

    console.log(`Encontrados ${Object.keys(hostsToMigrate).length} hosts para migrar`);

    // Migrar cada host
    for (const [oldHostId, hostData] of Object.entries(hostsToMigrate)) {
      // Crear el nuevo host con la estructura correcta
      const newHostRef = ref(database, `hosts/${oldHostId}`);
      await set(newHostRef, hostData);
      
      console.log(`Host ${oldHostId} migrado exitosamente`);
    }

    console.log('Migración completada exitosamente');
  } catch (error) {
    console.error('Error durante la migración:', error);
    throw error;
  }
};

/**
 * Función para verificar si la migración es necesaria
 */
export const checkMigrationNeeded = async (): Promise<boolean> => {
  try {
    const hostsRef = ref(database, 'hosts');
    const snapshot = await get(hostsRef);
    
    if (!snapshot.exists()) {
      return false;
    }

    let needsMigration = false;
    snapshot.forEach((childSnapshot) => {
      const hostData = childSnapshot.val();
      if (!hostData.ownerId) {
        needsMigration = true;
      }
    });

    return needsMigration;
  } catch (error) {
    console.error('Error verificando migración:', error);
    return false;
  }
}; 