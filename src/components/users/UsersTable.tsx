import type { User } from '@/types/user';

const ROLES = ['admin', 'user', 'host'];

interface Props {
  users: User[];
  currentUserId?: string;
  onRoleChange: (userId: string, newRole: string) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  deletingUserId: string | null;
}

const UsersTable = ({ users, currentUserId, onRoleChange, onEditUser, onDeleteUser, deletingUserId }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className='p-4 border border-gray-300 text-left text-sm'>ID</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Nombre</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Apellido</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Email</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Teléfono</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Rol</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Número de Cuenta</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Banco</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Reservas Activas</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Reservas Completadas</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Reservas Canceladas</th>
            <th className='p-4 border border-gray-300 text-left text-sm'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="p-4 border border-gray-300 font-mono text-sm">
                {user.id}
              </td>
              <td className='p-4 border border-gray-300 text-left text-sm'>{user.name || '-'}</td>
              <td className='p-4 border border-gray-300 text-left text-sm'>{user.surname || '-'}</td>
              <td className='p-4 border border-gray-300 text-left text-sm'>{user.email}</td>
              <td className='p-4 border border-gray-300 text-left text-sm'>{user.phone || '-'}</td>
              <td className='p-4 border border-gray-300 text-left text-sm'>
                {currentUserId === user.id ? (
                  <span className='text-gray-600'>{user.role}</span>
                ) : (
                  <select
                    value={user.role || 'user'}
                    onChange={e => onRoleChange(user.id, e.target.value)}
                    className="p-1 border border-gray-300 rounded text-sm"
                  >
                    {ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                )}
              </td>
              <td className="p-4 border border-gray-300 text-left text-sm">{user.accountNumber || '-'}</td>
              <td className="p-4 border border-gray-300 text-left text-sm">{user.bankName || '-'}</td>
              <td className="p-4 border border-gray-300 text-center text-sm">{user.reservesActives || 0}</td>
              <td className="p-4 border border-gray-300 text-center text-sm">{user.reservesDones || 0}</td>
              <td className="p-4 border border-gray-300 text-center text-sm">{user.reservesCancels || 0}</td>
              <td className="p-4 border border-gray-300 text-left text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Editar
                  </button>
                  {currentUserId !== user.id && (
                    <button
                      onClick={() => onDeleteUser(user)}
                      disabled={deletingUserId === user.id}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingUserId === user.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable; 