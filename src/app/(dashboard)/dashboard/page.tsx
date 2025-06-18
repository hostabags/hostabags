"use client"

import Header from "@/components/layout/header/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function page() {
  const { user, role } = useAuth();

  if (role !== "admin") {
    return <p>No tienes acceso</p>;
  }
  return (
    <>
      <Header/>
      <main className="text-2xl">
        Aqui estara el dashboard del administrador (Esta es una ruta protegida)
      </main>
    </>
  );
}
