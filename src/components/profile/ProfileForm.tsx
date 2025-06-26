import { UseFormRegisterReturn, FieldErrors } from "react-hook-form";
import { FormInput } from "@/components/ui/FormInput";
import { UserRole } from "@/components/user";
import Button from "@/components/ui/Button/Button";
import type { User } from "@/types/user";
import type { ProfileFormData } from "@/types/profileFormData";

interface ProfileFormProps {
  userData: User;
  isEditing: boolean;
  isSaving: boolean;
  register: (name: keyof ProfileFormData) => UseFormRegisterReturn;
  errors: FieldErrors<ProfileFormData>;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ProfileForm = ({
  userData,
  isEditing,
  isSaving,
  register,
  errors,
  onSubmit,
  onCancel,
}: ProfileFormProps) => {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          register={register("name")}
          error={errors.name?.message}
          className={!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
        />

        <FormInput
          label="Apellido"
          type="text"
          placeholder="Tu apellido"
          register={register("surname")}
          error={errors.surname?.message}
          className={!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="tu@email.com"
          register={register("email")}
          error={errors.email?.message}
          className="bg-gray-100 cursor-not-allowed"
        />

        <FormInput
          label="Teléfono"
          type="tel"
          placeholder="+34 600 000 000"
          register={register("phone")}
          error={errors.phone?.message}
          className={!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
        />

        <FormInput
          label="Número de Cuenta"
          type="text"
          placeholder="ES91 2100 0418 4502 0005 1332"
          register={register("accountNumber")}
          error={errors.accountNumber?.message}
          className={!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
        />

        <FormInput
          label="Banco"
          type="text"
          placeholder="Nombre del banco"
          register={register("bankName")}
          error={errors.bankName?.message}
          className={!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
        />
      </div>

      {/* Role Display */}
      <UserRole role={userData.role} />

      {/* Submit Button (only shown when editing) */}
      {isEditing && (
        <div className="flex justify-end space-x-3 pt-6 border-t">
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
        </div>
      )}
    </form>
  );
}; 