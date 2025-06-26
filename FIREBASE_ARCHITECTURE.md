# Nueva Arquitectura de Firebase - HostaBags

## 🏗️ Visión General

Esta documentación describe la nueva arquitectura de servicios de Firebase implementada en HostaBags, que proporciona una estructura más limpia, mantenible y escalable.

## 📁 Estructura de Archivos

```
src/
├── services/
│   └── firebase/
│       ├── config.ts              # Configuración centralizada de Firebase
│       ├── auth.service.ts        # Servicios de autenticación
│       ├── database.service.ts    # Servicios base de base de datos
│       ├── hosts.service.ts       # Servicios específicos de hosts
│       ├── users.service.ts       # Servicios específicos de usuarios
│       ├── bookings.service.ts    # Servicios específicos de reservas
│       └── index.ts               # Exportaciones centralizadas
├── hooks/
│   ├── useAuth.ts                 # Hook de autenticación
│   ├── useHosts.ts                # Hooks de hosts
│   ├── useBookings.ts             # Hooks de reservas
│   └── useUsers.ts                # Hooks de usuarios
└── utils/
    └── migration.ts               # Utilidades de migración
```

## 🔧 Servicios Principales

### 1. Configuración (`config.ts`)
- Configuración centralizada de Firebase
- Validación de variables de entorno
- Exportación de instancias de auth y database

### 2. Servicio de Autenticación (`auth.service.ts`)
```typescript
class AuthService {
  static async signUp(email: string, password: string, userData?: any)
  static async signIn(email: string, password: string)
  static async signOut()
  static async getUserRole(uid: string)
  static onAuthStateChanged(callback)
  static getCurrentUser()
}
```

### 3. Servicio de Base de Datos (`database.service.ts`)
```typescript
class DatabaseService {
  static async get<T>(path: string)
  static async getAll<T>(path: string)
  static async create<T>(path: string, data: Omit<T, 'id'>)
  static async createWithId<T>(path: string, id: string, data: Omit<T, 'id'>)
  static async update<T>(path: string, id: string, updates: Partial<T>)
  static async delete(path: string, id: string)
  static onValue<T>(path: string, callback)
  static onValueCollection<T>(path: string, callback)
}
```

### 4. Servicios Específicos de Dominio

#### Hosts Service (`hosts.service.ts`)
```typescript
class HostsService {
  static async getAll()
  static async getById(id: string)
  static async getByOwnerId(ownerId: string)
  static async create(hostData: Omit<Host, 'id'>)
  static async update(id: string, updates: Partial<Host>)
  static async delete(id: string)
  static async updateCalendar(hostId: string, dates: string[])
  static async removeFromCalendar(hostId: string, dates: string[])
  static onHostUpdate(id: string, callback)
  static onHostsUpdate(callback)
  static onHostsByOwnerUpdate(ownerId: string, callback)
}
```

#### Users Service (`users.service.ts`)
```typescript
class UsersService {
  static async getAll()
  static async getById(id: string)
  static async create(userData: Omit<User, 'id'> & { id: string })
  static async update(id: string, updates: Partial<User>)
  static async delete(id: string)
  static async updateRole(userId: string, newRole: string)
  static async getUsersWithHosts()
  static async getByRole(role: string)
  static async getUserHosts(userId: string)
  static onUserUpdate(id: string, callback)
  static onUsersUpdate(callback)
  static onUsersWithHostsUpdate(callback)
}
```

#### Bookings Service (`bookings.service.ts`)
```typescript
class BookingsService {
  static async getAll()
  static async getById(id: string)
  static async getByUserId(userId: string)
  static async getByHostId(hostId: string)
  static async create(bookingData: Omit<Booking, 'id'>)
  static async update(id: string, updates: Partial<Booking>)
  static async delete(id: string)
  static async createBookingAndUpdateHost(userId, bookingDetails, createdAt)
  static async deleteBookingAndUpdateHost(bookingId, hostId, dates)
  static onBookingUpdate(id: string, callback)
  static onBookingsUpdate(callback)
  static onUserBookingsUpdate(userId: string, callback)
  static onHostBookingsUpdate(hostId: string, callback)
}
```

## 🎣 Hooks Personalizados

### useAuth
```typescript
const { user, role, loading, signUp, signIn, logout } = useAuth();
```

### useHosts
```typescript
const { hosts, loading, error } = useHosts();
const { host, loading, error } = useHost(hostId);
const { hosts, loading, error } = useHostsByOwner(ownerId);
```

### useBookings
```typescript
const { bookings, loading, error } = useBookings();
const { bookings, loading, error } = useUserBookings(userId);
const { bookings, loading, error } = useHostBookings(hostId);
```

## 🔄 Migración de Datos

### Verificar Migración
```typescript
import { checkMigrationNeeded } from '@/utils/migration';

const needsMigration = await checkMigrationNeeded();
```

### Ejecutar Migración
```typescript
import { migrateHostsToNewStructure } from '@/utils/migration';

await migrateHostsToNewStructure();
```

## ✅ Beneficios de la Nueva Arquitectura

### 1. Separación de Responsabilidades
- Cada servicio tiene una responsabilidad específica
- Lógica de negocio separada de la lógica de datos
- Fácil testing y mantenimiento

### 2. Reutilización de Código
- Servicios base reutilizables
- Hooks personalizados para lógica común
- Funciones utilitarias centralizadas

### 3. Manejo de Errores Centralizado
- Errores tipados y traducidos
- Manejo consistente en toda la aplicación
- Mensajes de error amigables

### 4. Tipado TypeScript Robusto
- Interfaces bien definidas
- Tipos genéricos para reutilización
- Autocompletado mejorado

### 5. Real-time Updates
- Suscripciones automáticas a cambios
- Hooks que manejan el estado automáticamente
- Cleanup automático de listeners

### 6. Escalabilidad
- Fácil agregar nuevos servicios
- Estructura modular
- Patrones consistentes

## 🚀 Uso en Componentes

### Ejemplo: Lista de Hosts
```typescript
import { useHosts } from '@/hooks/useHosts';

export function HostList() {
  const { hosts, loading, error } = useHosts();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {hosts.map(host => (
        <div key={host.id}>{host.name}</div>
      ))}
    </div>
  );
}
```

### Ejemplo: Crear Host
```typescript
import { HostsService } from '@/services/firebase';

const createHost = async (hostData) => {
  try {
    const newHost = await HostsService.create(hostData);
    console.log('Host creado:', newHost);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## 🔧 Configuración

### Variables de Entorno Requeridas
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🧪 Testing

### Ejemplo de Test de Servicio
```typescript
import { HostsService } from '@/services/firebase';

describe('HostsService', () => {
  it('should create a new host', async () => {
    const hostData = {
      ownerId: 'user123',
      name: 'Test Host',
      address: 'Test Address',
      lat: 0,
      lng: 0,
      calendarSelected: []
    };
    
    const newHost = await HostsService.create(hostData);
    expect(newHost.name).toBe('Test Host');
  });
});
```

## 📈 Próximos Pasos

1. **Implementar caché local** para mejorar rendimiento
2. **Agregar validaciones** más robustas
3. **Implementar paginación** para listas grandes
4. **Agregar métricas** y logging
5. **Optimizar consultas** de Firebase
6. **Implementar offline support**

## 🔍 Troubleshooting

### Problemas Comunes

1. **Error de configuración**: Verificar variables de entorno
2. **Error de permisos**: Verificar reglas de Firebase
3. **Error de conexión**: Verificar conectividad a internet
4. **Error de tipos**: Verificar interfaces TypeScript

### Debugging

```typescript
// Habilitar logs de Firebase
import { DatabaseService } from '@/services/firebase';

// Los errores se manejan automáticamente y se muestran en consola
// También se pueden capturar en los componentes
``` 