"use client"

import { useEffect, useState } from 'react';
import { getUsers, updateUserRole } from '@/services/firebaseService';
import useAuth from '@/hooks/useAuth';
import type { User } from '@/types/user';

const ROLES = ['admin', 'user', 'host'];

const UsersPage = () => {
  const { user, role } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (err) {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers((prev) => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      setError('Error al actualizar el rol');
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <h2>Lista de usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name || ''} {u.surname || ''}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {user?.uid === u.id ? (
                  <span>No puedes cambiar tu propio rol</span>
                ) : (
                  <select
                    value={u.role}
                    onChange={e => handleRoleChange(u.id, e.target.value)}
                  >
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default UsersPage;
