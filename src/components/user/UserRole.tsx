interface UserRoleProps {
  role?: string;
}

export const UserRole = ({ role }: UserRoleProps) => {
  const getRoleDisplay = (role?: string) => {
    switch (role) {
      case 'admin':
        return {
          text: 'Administrador',
          classes: 'bg-red-100 text-red-800'
        };
      case 'host':
        return {
          text: 'Anfitrión',
          classes: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          text: 'Usuario',
          classes: 'bg-green-100 text-green-800'
        };
    }
  };

  const roleInfo = getRoleDisplay(role);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Rol de Usuario
      </label>
      <div className="flex items-center">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleInfo.classes}`}>
          {roleInfo.text}
        </span>
      </div>
    </div>
  );
}; 