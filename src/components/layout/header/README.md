# Header Components

Esta carpeta contiene los componentes modulares del Header de la aplicación HostaBags.

## Estructura

```
header/
├── Header.tsx              # Componente principal que orquesta todos los demás
├── HeaderLogo.tsx          # Logo y nombre de la marca
├── HeaderNavigation.tsx    # Navegación de escritorio
├── HeaderUserActions.tsx   # Acciones del usuario (login/logout)
├── HeaderMobileMenu.tsx    # Menú móvil
├── HeaderMobileButton.tsx  # Botón del menú móvil
├── index.ts               # Exportaciones centralizadas
└── README.md              # Esta documentación
```

## Componentes

### Header.tsx
Componente principal que maneja el estado global del header y coordina todos los subcomponentes.

**Props:** Ninguna (usa hooks internos)

**Funcionalidades:**
- Manejo del estado de scroll
- Gestión del menú móvil
- Integración con el contexto de autenticación

### HeaderLogo.tsx
Renderiza el logo y nombre de la marca con efectos hover.

**Props:** Ninguna

**Funcionalidades:**
- Logo con imagen
- Nombre de la marca
- Efectos de hover y transiciones

### HeaderNavigation.tsx
Navegación de escritorio que se adapta según el rol del usuario.

**Props:**
- `user: User | null` - Usuario actual de Firebase
- `role: string | null` - Rol del usuario

**Funcionalidades:**
- Navegación dinámica según el rol
- Iconos para cada elemento
- Efectos hover

### HeaderUserActions.tsx
Maneja las acciones del usuario (login/logout y avatar).

**Props:**
- `user: User | null` - Usuario actual de Firebase
- `onLogout: () => void` - Función de logout

**Funcionalidades:**
- Avatar del usuario con iniciales
- Botón de logout
- Enlaces de login/registro para usuarios no autenticados

### HeaderMobileMenu.tsx
Menú móvil con navegación adaptativa.

**Props:**
- `isOpen: boolean` - Estado del menú
- `user: User | null` - Usuario actual
- `role: string | null` - Rol del usuario
- `onClose: () => void` - Función para cerrar el menú

**Funcionalidades:**
- Animaciones de apertura/cierre
- Navegación adaptativa según rol
- Cierre automático al hacer clic

### HeaderMobileButton.tsx
Botón para abrir/cerrar el menú móvil.

**Props:**
- `isOpen: boolean` - Estado del menú
- `onToggle: () => void` - Función para alternar el estado

**Funcionalidades:**
- Icono dinámico (hamburguesa/X)
- Efectos hover
- Accesibilidad

## Uso

```tsx
import { Header } from '@/components/layout/header';

// En tu componente
<Header />
```

## Beneficios de la Modularización

1. **Mantenibilidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otros contextos
3. **Testabilidad**: Es más fácil escribir tests para componentes pequeños
4. **Legibilidad**: El código es más fácil de entender y navegar
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades sin afectar otros componentes

## Convenciones

- Todos los componentes usan TypeScript con interfaces bien definidas
- Los estilos usan Tailwind CSS
- Los iconos provienen de Lucide React
- Los componentes siguen el patrón de props drilling para pasar datos
- Se mantiene la consistencia en el naming y estructura 