"use client"

import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useUsersManagement } from '@/hooks/useUsersManagement';
import { EditUserModal, DeleteUserModal, UsersTable, UsersStatus } from '@/components/users';
import type { User } from '@/types/user';

const UsersPage = () => {
  const { user } = useAuth();
  const {
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
    closeModal
  } = useUsersManagement();

  const [deleteModalUser, setDeleteModalUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (userToDelete: User) => {
    setDeleteModalUser(userToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteModalUser) {
      handleDeleteUser(deleteModalUser.id);
      setIsDeleteModalOpen(false);
      setDeleteModalUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteModalUser(null);
  };

  return (
    <main className='p-8'>
      <h2 className="text-3xl font-bold text-gray-900 ">Lista de usuarios</h2>
      
      <UsersStatus loading={loading} error={error} />
      
      {!loading && !error && (
        <UsersTable
          users={users}
          currentUserId={user?.uid}
          onRoleChange={handleRoleChange}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteClick}
          deletingUserId={deletingUserId}
        />
      )}

      <EditUserModal
        user={editingUser}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveUser}
      />

      <DeleteUserModal
        user={deleteModalUser}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={deletingUserId === deleteModalUser?.id}
      />
    </main>
  );
};

export default UsersPage;
