import { DatabaseService } from '@/services/firebase';

/**
 * Script de migración para convertir hosts existentes a la nueva estructura
 * donde hosts tienen IDs independientes y están vinculados a usuarios por ownerId
 */
export const migrateHostsToNewStructure = async (): Promise<void> => {
  try {
    console.log('Iniciando migración de hosts...');
    
    // Obtener todos los hosts existentes
    const allHosts = await DatabaseService.getAll<any>('hosts');
    
    if (allHosts.length === 0) {
      console.log('No hay hosts para migrar');
      return;
    }

    const hostsToMigrate = allHosts.filter(host => !host.ownerId);

    console.log(`Encontrados ${hostsToMigrate.length} hosts para migrar`);

    // Migrar cada host
    for (const host of hostsToMigrate) {
      const hostWithOwner = {
        ...host,
        ownerId: host.id, // El ID del host se convierte en el ownerId
      };

      // Actualizar el host con la nueva estructura
      await DatabaseService.update('hosts', host.id, { ownerId: host.id });
      
      console.log(`Host ${host.id} migrado exitosamente`);
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
    const allHosts = await DatabaseService.getAll<any>('hosts');
    
    if (allHosts.length === 0) {
      return false;
    }

    return allHosts.some(host => !host.ownerId);
  } catch (error) {
    console.error('Error verificando migración:', error);
    return false;
  }
}; 