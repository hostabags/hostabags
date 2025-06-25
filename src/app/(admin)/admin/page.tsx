"use client";

import Header from "@/components/layout/header/Header";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  const { role } = useAuth();

  if (role !== "admin") {
    return (
      <>
        <Header />
        <p>No tienes acceso a este contenido, solo para administradores</p>;
      </>
    );
  }
  return (
    <>
      <Header />
      <main className="text-2xl">
       Datos personales del administrador
      </main>
    </>
  );
}
