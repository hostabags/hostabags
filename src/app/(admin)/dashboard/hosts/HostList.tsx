"use client";

import { useEffect, useState } from "react";
import { Host } from "@/types/host";
import { User } from "@/types/user";
import { UsersService, UserWithHosts } from "@/services/firebase";

export function HostList() {
  const [usersWithHosts, setUsersWithHosts] = useState<UserWithHosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await UsersService.getUsersWithHosts();
        // Filtrar solo usuarios que son hosts y tienen hosts asociados
        const hostsUsers = data.filter(user => user.role === 'host' && user.hosts.length > 0);
        setUsersWithHosts(hostsUsers);
        setError(null);
      } catch (error) {
        setError("No se pudieron cargar los hosts.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {usersWithHosts.length === 0 ? (
        <p>No hay hosts registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Propietario</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hosts</th>
            </tr>
          </thead>
          <tbody>
            {usersWithHosts.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {user.name} {user.surname}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {user.hosts.map((host, index) => (
                    <div key={host.id} style={{ marginBottom: index > 0 ? '8px' : '0' }}>
                      <strong>{host.name}</strong><br />
                      <small>{host.address}</small>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 