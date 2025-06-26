import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { UsersService } from "@/services/firebase/users.service";
import type { User } from "@/types/user";
import type { ProfileFormData } from "@/types/profileFormData";

export const useProfile = () => {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (authUser?.uid) {
      loadUserData();
    }
  }, [authUser?.uid]);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const data = await UsersService.getById(authUser!.uid);
      if (data) {
        setUserData(data);
        reset({
          name: data.name || "",
          surname: data.surname || "",
          phone: data.phone || "",
          email: data.email || "",
          accountNumber: data.accountNumber || "",
          bankName: data.bankName || "",
        });
      }
    } catch (err) {
      setError("Error al cargar los datos del usuario");
      console.error("Error loading user data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!authUser?.uid) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      await UsersService.update(authUser.uid, {
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        accountNumber: data.accountNumber,
        bankName: data.bankName,
      });

      setSuccess("Perfil actualizado correctamente");
      setIsEditing(false);
      await loadUserData();
    } catch (err) {
      setError("Error al actualizar el perfil");
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    if (userData) {
      reset({
        name: userData.name || "",
        surname: userData.surname || "",
        phone: userData.phone || "",
        email: userData.email || "",
        accountNumber: userData.accountNumber || "",
        bankName: userData.bankName || "",
      });
    }
  };

  return {
    userData,
    isEditing,
    isLoading,
    isSaving,
    error,
    success,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleEdit,
    handleCancel,
  };
}; 