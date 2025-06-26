# Arquitectura de Usuarios y Hosts

## Visión General

Esta aplicación maneja dos entidades principales: **Usuarios** y **Hosts**, con una relación flexible que permite a un usuario tener múltiples hosts.

## Estructura de Datos

### Usuario (User)
```typescript
interface User {
  id: string;           // ID único del usuario (Firebase Auth UID)
  email: string;        // Email del usuario
  role?: string;        // Rol: 'user', 'host', 'admin'
  name?: string;        // Nombre del usuario
  surname?: string;     // Apellido del usuario
  phone?: string;       // Teléfono
  // ... otros campos de perfil
}
```

### Host
```typescript
interface Host {
  id: string;           // ID único del host (generado por Firebase)
  ownerId: string;      // Referencia al usuario propietario
  name: string;         // Nombre del establecimiento
  address: string;      // Dirección física
  lat: number;          // Latitud
  lng: number;          // Longitud
  description?: string; // Descripción del host
  calendarSelected: string[]; // Fechas reservadas
  // ... otros campos específicos del host
}
```

## Relación Usuario-Host

- **1:N**: Un usuario puede tener múltiples hosts
- **Vinculación**: Los hosts se vinculan a usuarios mediante el campo `ownerId`
- **Flexibilidad**: Un usuario puede cambiar de vivienda creando un nuevo host sin perder su cuenta

## Beneficios de esta Arquitectura

### 1. Escalabilidad
- Un usuario puede administrar múltiples propiedades
- Fácil expansión del negocio

### 2. Flexibilidad
- Cambiar de vivienda = crear nuevo host
- Mantener historial de hosts anteriores
- No perder datos de usuario al cambiar de ubicación

### 3. Administración
- Mejor gestión de múltiples propiedades
- Separación clara entre datos de usuario y datos de host

## Servicios Principales

### Crear Host
```typescript
createHost(hostData: Omit<Host, 'id'>): Promise<Host>
```

### Obtener Hosts por Usuario
```typescript
getHostsByOwnerId(ownerId: string): Promise<Host[]>
```

### Obtener Usuarios con sus Hosts
```typescript
getUsersWithHosts(): Promise<(User & { hosts: Host[] })[]>
```

## Migración de Datos

La aplicación incluye herramientas de migración para convertir hosts existentes de la estructura anterior (donde el ID del host era el mismo que el del usuario) a la nueva estructura.

### Verificar Migración
```typescript
checkMigrationNeeded(): Promise<boolean>
```

### Ejecutar Migración
```typescript
migrateHostsToNewStructure(): Promise<void>
```

## Casos de Uso

### 1. Usuario con un Host
- Usuario se registra como host
- Crea su primer host
- El host se vincula mediante `ownerId`

### 2. Usuario con Múltiples Hosts
- Usuario ya registrado como host
- Crea host adicional desde su panel
- Ambos hosts comparten el mismo `ownerId`

### 3. Cambio de Vivienda
- Usuario crea nuevo host con nueva dirección
- Host anterior puede mantenerse para historial
- Usuario mantiene su cuenta y datos

### 4. Administración
- Admin puede ver todos los usuarios con sus hosts
- Filtrado por rol y número de hosts
- Gestión centralizada de propiedades

## Consideraciones de Seguridad

- Solo usuarios autenticados pueden crear hosts
- Solo el propietario puede modificar sus hosts
- Admins pueden ver todos los hosts
- Validación de roles en el frontend y backend 