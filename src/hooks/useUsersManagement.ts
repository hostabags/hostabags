import { useState, useEffect } from 'react';
import { UsersService } from '@/services/firebase';
import type { User } from '@/types/user';

export const useUsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersList = await UsersService.getAll();
      setUsers(usersList);
    } catch (err) {
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setError(null);
      await UsersService.updateRole(userId, newRole);
      setUsers((prev) => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      setError('Error al actualizar el rol');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (updatedData: Partial<User>) => {
    if (!editingUser) return;
    
    try {
      setError(null);
      await UsersService.update(editingUser.id, updatedData);
      setUsers((prev) => prev.map(u => u.id === editingUser.id ? { ...u, ...updatedData } : u));
      setEditingUser(null);
      setIsModalOpen(false);
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setError(null);
      setDeletingUserId(userId);
      await UsersService.delete(userId);
      setUsers((prev) => prev.filter(u => u.id !== userId));
      setDeletingUserId(null);
    } catch (err) {
      setError('Error al eliminar el usuario');
      setDeletingUserId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return {
    users,
    loading,
    error,
    editingUser,
    isModalOpen,
    deletingUserId,
    handleRoleChange,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    closeModal,
    refetch: fetchUsers
  };
}; 