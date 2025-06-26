"use client";

import { useEffect, useState } from "react";
import { UsersService, UserWithHosts } from "@/services/firebase";
import { HostOwnerCard } from "./HostOwnerCard";

interface Props {
  refreshKey?: number;
}

export function HostsList({ refreshKey }: Props) {
  const [usersWithHosts, setUsersWithHosts] = useState<UserWithHosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await UsersService.getUsersWithHosts();
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
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600">Cargando hosts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {usersWithHosts.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 text-lg">No hay hosts registrados.</div>
          <p className="text-sm text-gray-400 mt-2">Crea el primer host usando el formulario.</p>
        </div>
      ) : (
        usersWithHosts.map((user) => (
          <HostOwnerCard key={user.id} user={user} />
        ))
      )}
    </div>
  );
} 