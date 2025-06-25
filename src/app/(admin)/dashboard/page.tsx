"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  const { role } = useAuth();

  if (role !== "admin") {
    return (
      <>
        <main>No tienes acceso a este contenido, solo para administradores</main>;
      </>
    );
  }
  return (
    <>
      <main className="text-2xl">
        Aqui estara el dashboard del administrador (Esta es una ruta protegida)
        <div>Aqui van las graficas</div>
        <div><Link href="/dashboard/users">Aqui van los datos de los usuarios</Link></div>
        <div><Link href="/dashboard/hosts">Aqui van los datos de los hosts</Link></div>
      </main>
    </>
  );
}
