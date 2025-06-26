"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { DashboardCard } from "@/components/charts";
import { ChartIcon, UsersIcon, HostIcon } from "@/components/icons/SvgIcons";

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
      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Dashboard del Administrador
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <Link href="/dashboard/charts" className="block h-full">
            <DashboardCard
              icon={ChartIcon}
              title="Gráficos y Estadísticas"
              description="Visualiza el rendimiento de la plataforma con gráficos interactivos"
            />
          </Link>
          
          <Link href="/dashboard/users" className="block h-full">
            <DashboardCard
              icon={UsersIcon}
              title="Gestión de Usuarios"
              description="Administra usuarios, permisos y configuraciones"
            />
          </Link>
          
          <Link href="/dashboard/hosts" className="block h-full">
            <DashboardCard
              icon={HostIcon}
              title="Gestión de Hosts"
              description="Gestiona hosts, verifica propiedades y revisa solicitudes"
            />
          </Link>
        </div>
      </main>
    </>
  );
}
