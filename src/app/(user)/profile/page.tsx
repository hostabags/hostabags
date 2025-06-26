"use client";

import { useProfile } from "@/hooks/useProfile";
import {
  ProfileHeader,
  ProfileStats,
  ProfileForm,
  ProfileLoading,
  ProfileError,
  ProfileSuccess,
  ProfileNoData,
} from "@/components/profile";

export default function ProfilePage() {
  const {
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
  } = useProfile();

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!userData) {
    return <ProfileNoData />;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ProfileHeader
            isEditing={isEditing}
            isSaving={isSaving}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSubmit={handleSubmit(onSubmit)}
          />

          <div className="px-6 py-8">
            {error && <ProfileError message={error} />}
            {success && <ProfileSuccess message={success} />}

            <ProfileStats userData={userData} />

            <ProfileForm
              userData={userData}
              isEditing={isEditing}
              isSaving={isSaving}
              register={register}
              errors={errors}
              onSubmit={handleSubmit(onSubmit)}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
