# Hostabags

**Hostabags** es una aplicación web desarrollada con Next.js, TypeScript y Tailwind CSS que permite a los usuarios encontrar y reservar espacios para dejar sus maletas en distintas ubicaciones. Utiliza Firebase para la autenticación y la base de datos, y MapTiler para mostrar los hosts en un mapa interactivo.

- 🌐 **Demo en vivo**: [Hostabags](https://hostabags.vercel.app/)
- 📱 **Responsive**: Optimizada para móviles y desktop
- 🔐 **Autenticación**: Sistema completo de registro e inicio de sesión
- 🗺️ **Mapa interactivo**: Visualización de hosts con geolocalización
- 📅 **Sistema de reservas**: Calendario integrado para gestionar disponibilidad

## 🧳 Características Principales

### Para Usuarios
- ✅ Registro e inicio de sesión con Firebase Auth
- ✅ Exploración de hosts en mapa interactivo
- ✅ Visualización de información detallada de cada host
- ✅ Sistema de reservas con calendario de disponibilidad
- ✅ Gestión de perfil de usuario
- ✅ Historial de reservas realizadas

### Para Hosts
- ✅ Creación y gestión de espacios para maletas
- ✅ Calendario de disponibilidad personalizable
- ✅ Información detallada del establecimiento
- ✅ Gestión de reservas recibidas

### Para Administradores
- ✅ Panel de administración completo
- ✅ Gestión de usuarios y hosts
- ✅ Estadísticas y métricas del sistema
- ✅ Herramientas de migración de datos

## 🚀 Tecnologías Utilizadas

### Frontend
- [Next.js 15](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework de CSS
- [React Hook Form](https://react-hook-form.com/) - Gestión de formularios
- [Zod](https://zod.dev/) - Validación de esquemas
- [Lucide React](https://lucide.dev/) - Iconos

### Mapas y Geolocalización
- [Leaflet](https://leafletjs.com/) - Biblioteca de mapas
- [React Leaflet](https://react-leaflet.js.org/) - Componentes de mapas para React
- [MapTiler](https://www.maptiler.com/) - Proveedor de mapas

### Backend y Base de Datos
- [Firebase](https://firebase.google.com/) - Backend as a Service
  - Authentication
  - Realtime Database
  - Hosting

### Testing
- [Jest](https://jestjs.io/) - Framework de testing
- [React Testing Library](https://testing-library.com/) - Testing de componentes
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro/) - Simulación de eventos de usuario

### Herramientas de Desarrollo
- [ESLint](https://eslint.org/) - Linting de código
- [Sass](https://sass-lang.com/) - Preprocesador CSS
- [Recharts](https://recharts.org/) - Gráficos para el dashboard

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta en Firebase
- Cuenta en MapTiler

### 1. Clonar el repositorio

```bash
git clone https://github.com/hostabags/hostabags.git
cd hostabags
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# MapTiler Configuration
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
```

### 4. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication con Email/Password
4. Crea una Realtime Database
5. Configura las reglas de seguridad
6. Copia las credenciales a tu `.env.local`

### 5. Configurar MapTiler

1. Regístrate en [MapTiler](https://www.maptiler.com/)
2. Crea un nuevo proyecto
3. Copia tu API key al `.env.local`

### 6. Ejecutar la aplicación

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (admin)/           # Rutas protegidas para administradores
│   ├── (auth)/            # Rutas de autenticación
│   ├── (host)/            # Rutas para hosts
│   ├── (public)/          # Rutas públicas
│   └── (user)/            # Rutas para usuarios
├── components/            # Componentes reutilizables
│   ├── calendar/          # Componentes de calendario
│   ├── charts/            # Componentes de gráficos
│   ├── hosts/             # Componentes relacionados con hosts
│   ├── layout/            # Componentes de layout
│   ├── map/               # Componentes de mapas
│   ├── profile/           # Componentes de perfil
│   └── ui/                # Componentes de UI base
├── contexts/              # Contextos de React
├── hooks/                 # Hooks personalizados
├── services/              # Servicios de Firebase
├── types/                 # Definiciones de tipos TypeScript
├── utils/                 # Utilidades y helpers
└── validations/           # Esquemas de validación
```

## 🗺️ Arquitectura de la Aplicación

### Sistema de Usuarios y Hosts
- **Relación 1:N**: Un usuario puede tener múltiples hosts
- **Flexibilidad**: Los usuarios pueden cambiar de vivienda creando nuevos hosts
- **Roles**: Sistema de roles (user, host, admin) con permisos diferenciados

### Servicios de Firebase
- **AuthService**: Gestión de autenticación
- **DatabaseService**: Operaciones CRUD base
- **HostsService**: Gestión específica de hosts
- **UsersService**: Gestión de usuarios
- **BookingsService**: Sistema de reservas

### Hooks Personalizados
- `useAuth`: Gestión de estado de autenticación
- `useHosts`: Gestión de datos de hosts
- `useBookings`: Gestión de reservas
- `useProfile`: Gestión de perfiles de usuario

## 🚀 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con coverage
npm run server       # Servidor JSON para desarrollo
```

## 🧪 Testing

El proyecto incluye tests unitarios y de integración:

- **Componentes**: Tests para componentes principales
- **Hooks**: Tests para hooks personalizados
- **Servicios**: Tests para servicios de Firebase
- **Utilidades**: Tests para funciones utilitarias

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests específicos
npm test -- --testNamePattern="HostPopup"

# Tests con coverage
npm run test:coverage
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Proveedores

La aplicación es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa TypeScript para todo el código nuevo

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de Firebase](https://firebase.google.com/docs)
2. Consulta los [issues existentes](https://github.com/hostabags/hostabags/issues)
3. Crea un nuevo issue con detalles del problema

## ✅ Estado del Proyecto

🚧 **En desarrollo activo**

### Funcionalidades Implementadas
- ✅ Sistema completo de autenticación
- ✅ Mapa interactivo con hosts
- ✅ Sistema de reservas
- ✅ Panel de administración
- ✅ Gestión de perfiles
- ✅ Tests unitarios
- ✅ Arquitectura escalable

### Próximas Funcionalidades
- 🔄 Sistema de reseñas y calificaciones
- 🔄 Pagos online integrados
- 🔄 Notificaciones push
- 🔄 API REST pública
- 🔄 Aplicación móvil
- 🔄 Sistema de chat entre usuarios y hosts

## 🙏 Agradecimientos

- [Firebase](https://firebase.google.com/) por el backend robusto
- [MapTiler](https://www.maptiler.com/) por los mapas de alta calidad
- [Vercel](https://vercel.com/) por el hosting y despliegue
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Next.js](https://nextjs.org/) por el framework de React

---

**Desarrollado con ❤️ por el equipo de Hostabags**

