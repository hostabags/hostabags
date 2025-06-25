"use client";

import Header from "@/components/layout/header/Header";
import useAuth from "@/hooks/useAuth";
import { CreateHostForm } from "./CreateHostForm";
import { HostList } from "./HostList";
import { useState } from "react";

export default function HostsPage() {
  const { role } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (role !== "admin") {
    return (
      <>
        <Header />
        <main>
          <p>No tienes acceso a este contenido, solo para administradores</p>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="text-2xl p-4">
        <h1>Administrar Hosts</h1>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <section style={{ flex: 1 }}>
            <HostList key={refreshKey} />
          </section>
          <section style={{ flex: 1 }}>
            <CreateHostForm onHostCreated={() => setRefreshKey(key => key + 1)} />
          </section>
        </div>
      </main>
    </>
  );
}
