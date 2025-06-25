import type { User } from '@/types/user';

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteUserModal = ({ user, isOpen, onClose, onConfirm, isDeleting }: Props) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-11/12">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Confirmar Eliminación</h3>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            ¿Estás seguro de que quieres eliminar al usuario:
          </p>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="font-medium">{user.name || 'Sin nombre'} {user.surname || ''}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500 font-mono">ID: {user.id}</p>
          </div>
        </div>

        <div className="text-sm text-red-600 mb-6 p-3 bg-red-50 border border-red-200 rounded">
          <p className="font-medium">⚠️ Advertencia:</p>
          <p>Esta acción no se puede deshacer. Se eliminarán todos los datos del usuario.</p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Eliminando...
              </>
            ) : (
              'Eliminar Usuario'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal; 