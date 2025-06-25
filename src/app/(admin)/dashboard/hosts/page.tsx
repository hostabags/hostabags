"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { HostsList, CreateHostForm, MigrationTool } from "@/components/hosts";

export default function HostsPage() {
  const { role } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (role !== "admin") {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">
              Acceso Denegado
            </div>
            <p className="text-gray-600">
              No tienes acceso a este contenido, solo para administradores
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Hosts</h1>
          <p className="mt-2 text-gray-600">
            Gestiona los hosts registrados en la plataforma
          </p>
        </div>
        
        {/* Migration Tool */}
        <div className="mb-8">
          <MigrationTool />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hosts List */}
          <section>
            <HostsList refreshKey={refreshKey} />
          </section>
          
          {/* Create Host Form */}
          <section>
            <CreateHostForm onHostCreated={() => setRefreshKey(key => key + 1)} />
          </section>
        </div>
      </div>
    </main>
  );
}
