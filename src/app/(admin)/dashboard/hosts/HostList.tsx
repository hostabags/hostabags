"use client";

import { useEffect, useState } from "react";
import { Host } from "@/types/host";
import { getHosts } from "@/services/firebaseService";

export function HostList() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        setLoading(true);
        const fetchedHosts = await getHosts();
        // Ordenar hosts alfabéticamente por nombre
        fetchedHosts.sort((a, b) => a.name.localeCompare(b.name));
        setHosts(fetchedHosts);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los hosts.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  if (loading) {
    return <p>Cargando hosts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Listado de Hosts</h2>
      {hosts.length === 0 ? (
        <p>No hay hosts registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre del establecimiento</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((host) => (
              <tr key={host.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{host.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{host.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 