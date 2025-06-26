import Button from "@/components/ui/Button/Button";

interface ProfileHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const ProfileHeader = ({
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSubmit,
}: ProfileHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
          <p className="text-blue-100 mt-2">
            Gestiona tu información personal
          </p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button
              onClick={onEdit}
              colorButton="indigo"
              colorText="white"
              size="base"
            >
              Editar Perfil
            </Button>
          ) : (
            <>
              <Button
                onClick={onCancel}
                colorButton="gray"
                colorText="white"
                size="base"
              >
                Cancelar
              </Button>
              {!isSaving && (
                <Button
                  onClick={onSubmit}
                  colorButton="green"
                  colorText="white"
                  size="base"
                >
                  Guardar Cambios
                </Button>
              )}
              {isSaving && (
                <button
                  disabled
                  className="bg-gray-400 text-white text-base mx-2 py-1 px-3 rounded transition-colors duration-200 cursor-not-allowed"
                >
                  Guardando...
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 