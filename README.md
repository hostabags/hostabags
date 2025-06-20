# Hostabags

**Hostabags** es una aplicación web desarrollada con Next.js, TypeScript y Tailwind CSS que permite a los usuarios encontrar y reservar espacios para dejar sus maletas en distintas ubicaciones. Utiliza Firebase para la autenticación y la base de datos, y MapTiler para mostrar los hosts en un mapa interactivo.

- Visita la web de [Hostabags](https://hostabags.vercel.app/)

## 🧳 Características

- Registro e inicio de sesión de usuarios (Firebase Auth).
- Mapa interactivo con marcadores para ver los hosts disponibles (MapTiler).
- Hosts con calendario de disponibilidad.
- Sistema de reservas.
- Estilo moderno y responsive con Tailwind CSS.

## 🚀 Tecnologías

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [MapTiler](https://www.maptiler.com/)
- [vercel](https://vercel.com/)

## 📦 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/hostabags/hostabags.git
cd hostabags
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura Firebase:

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
- Habilita la autenticación por email/contraseña.
- Crea una base de datos Firestore.
- Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Configura MapTiler:

- Regístrate en [MapTiler](https://www.maptiler.com/) y consigue tu API key.
- Añádela en el archivo `.env.local`:

```
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
```

5. Inicia la aplicación:

```bash
npm run dev
```

Accede a `http://localhost:3000` para ver la app en funcionamiento.

## 🗺️ Cómo funciona

### Usuarios

- Pueden registrarse, iniciar sesión y cerrar sesión.
- Pueden ver un mapa con todos los hosts disponibles.
- Pueden seleccionar un host, ver su información y calendario de disponibilidad.
- Pueden hacer reservas para dejar sus maletas en un host.

### Hosts

- Se muestran en el mapa con pines personalizados.
- Cada host tiene un calendario con fechas seleccionables (disponibles).
- Los hosts pueden ser gestionados desde el backend o en futuras versiones desde el panel de usuario.

## ✅ Estado del proyecto

🚧 En desarrollo activo. Se planean mejoras como sistema de reseñas, pagos online y gestión de hosts por los propios usuarios.

