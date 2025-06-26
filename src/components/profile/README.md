# Profile Components

Esta carpeta contiene todos los componentes relacionados con la página de perfil de usuario, organizados de manera modular y reutilizable.

## Estructura

```
src/components/profile/
├── ProfileHeader.tsx      # Header con título y botones de acción
├── ProfileStats.tsx       # Estadísticas del usuario (reservas)
├── ProfileForm.tsx        # Formulario de edición del perfil
├── ProfileStates.tsx      # Estados de UI (loading, error, success, no data)
├── index.ts              # Exportaciones centralizadas
└── README.md             # Esta documentación
```

## Componentes

### ProfileHeader
- **Propósito**: Header del perfil con título y botones de edición/guardado
- **Props**: `isEditing`, `isSaving`, `onEdit`, `onCancel`, `onSubmit`
- **Responsabilidad**: UI del header y controles de edición

### ProfileStats
- **Propósito**: Muestra estadísticas del usuario (reservas activas, completadas, canceladas)
- **Props**: `userData`
- **Responsabilidad**: Renderizado de estadísticas con iconos y colores

### ProfileForm
- **Propósito**: Formulario completo para editar datos del perfil
- **Props**: `userData`, `isEditing`, `isSaving`, `register`, `errors`, `onSubmit`, `onCancel`
- **Responsabilidad**: Campos del formulario y validaciones

### ProfileStates
- **Propósito**: Componentes para diferentes estados de la aplicación
- **Componentes**:
  - `ProfileLoading`: Estado de carga
  - `ProfileError`: Mensajes de error
  - `ProfileSuccess`: Mensajes de éxito
  - `ProfileNoData`: Estado sin datos

## Hook Personalizado

### useProfile
- **Ubicación**: `src/hooks/useProfile.ts`
- **Propósito**: Lógica de estado y operaciones del perfil
- **Retorna**: Estado completo y funciones para manejar el perfil

## Beneficios de esta estructura

1. **Separación de responsabilidades**: Cada componente tiene una función específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras partes
3. **Mantenibilidad**: Código más fácil de mantener y debuggear
4. **Testabilidad**: Componentes más pequeños son más fáciles de testear
5. **Legibilidad**: Código más limpio y comprensible
6. **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Uso

```tsx
import { useProfile } from "@/hooks/useProfile";
import {
  ProfileHeader,
  ProfileStats,
  ProfileForm,
  ProfileLoading,
  ProfileError,
  ProfileSuccess,
  ProfileNoData,
} from "@/components/profile";

export default function ProfilePage() {
  const profileData = useProfile();
  
  // Renderizar componentes según el estado
}
``` 