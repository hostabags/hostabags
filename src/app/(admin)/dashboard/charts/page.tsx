"use client";

import useAuth from "@/hooks/useAuth";
import DashboardCharts from "@/components/charts/DashboardCharts";

export default function ChartsPage() {
  const { role } = useAuth();

  if (role !== "admin") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Acceso Denegado
        </h1>
        <p>No tienes acceso a este contenido, solo para administradores</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard de Gráficos
      </h1>
      
      <DashboardCharts />
    </div>
  );
}
