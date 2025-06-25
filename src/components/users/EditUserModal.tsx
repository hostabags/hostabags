import { useEffect, useState } from 'react';
import type { User } from '@/types/user';

const ROLES = ['admin', 'user', 'host'];

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

const EditUserModal = ({ user, isOpen, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'user',
        accountNumber: user.accountNumber || '',
        bankName: user.bankName || '',
        reservesActives: user.reservesActives || 0,
        reservesDones: user.reservesDones || 0,
        reservesCancels: user.reservesCancels || 0,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-11/12 max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
        <p className="mb-4"><strong>ID:</strong> {user.id}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Nombre:
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Apellido:
              <input
                type="text"
                value={formData.surname || ''}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Email:
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Teléfono:
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Rol:
              <select
                value={formData.role || 'user'}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Número de Cuenta:
              <input
                type="text"
                value={formData.accountNumber || ''}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Banco:
              <input
                type="text"
                value={formData.bankName || ''}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Reservas Activas:
              <input
                type="number"
                value={formData.reservesActives || 0}
                onChange={(e) => setFormData({ ...formData, reservesActives: parseInt(e.target.value) || 0 })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Reservas Completadas:
              <input
                type="number"
                value={formData.reservesDones || 0}
                onChange={(e) => setFormData({ ...formData, reservesDones: parseInt(e.target.value) || 0 })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Reservas Canceladas:
              <input
                type="number"
                value={formData.reservesCancels || 0}
                onChange={(e) => setFormData({ ...formData, reservesCancels: parseInt(e.target.value) || 0 })}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal; 