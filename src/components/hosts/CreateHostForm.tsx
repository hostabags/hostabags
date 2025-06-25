"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  HostsService,
  UsersService,
  firebaseConfig,
} from "@/services/firebase";
import { createHostSchema, CreateHostSchema } from "@/validations/hostSchema";
import { geocodeAddress } from "@/utils/geocoding";
import { FormInput, FormGrid, FormSection } from "@/components/ui";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/map/LocationPickerMap"), {
  ssr: false,
});

interface Props {
  onHostCreated: () => void;
}

export function CreateHostForm({ onHostCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateHostSchema>({
    resolver: zodResolver(createHostSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setValue("address", address, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateHostSchema) => {
    setError(null);
    setSuccess(null);

    const coordinates = await geocodeAddress(data.address);
    if (!coordinates) {
      setError(
        "No se pudo verificar la dirección. Inténtalo de nuevo con una dirección válida."
      );
      return;
    }

    const secondaryApp = initializeApp(
      firebaseConfig,
      "secondary-app-for-host-creation"
    );
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        data.email,
        data.password
      );
      const { uid } = userCredential.user;

      await UsersService.create({
        id: uid,
        email: data.email,
        name: data.ownerName,
        surname: data.ownerSurname,
        role: "host",
      });

      await HostsService.create({
        ownerId: uid,
        name: data.hostName,
        address: data.address,
        lat: coordinates.lat,
        lng: coordinates.lng,
        description: data.description,
        calendarSelected: [],
      });

      setSuccess("¡Host creado con éxito!");
      onHostCreated();
      reset();
    } catch (error: any) {
      setError(`Error al crear el host: ${error.message}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Crear nuevo Host
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Completa la información para crear un nuevo host
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Información del Propietario */}
        <FormSection title="Información del Propietario">
          <FormInput
            label="Email del propietario"
            type="email"
            placeholder="ejemplo@email.com"
            register={register("email")}
            error={errors.email?.message}
            required
          />

          <FormGrid cols={2}>
            <FormInput
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              register={register("password")}
              error={errors.password?.message}
              required
            />
            <FormInput
              label="Confirmar Contraseña"
              type="password"
              placeholder="Repite la contraseña"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
              required
            />
          </FormGrid>

          <FormGrid cols={2}>
            <FormInput
              label="Nombre del propietario"
              placeholder="Nombre"
              register={register("ownerName")}
              error={errors.ownerName?.message}
              required
            />
            <FormInput
              label="Apellido del propietario"
              placeholder="Apellido"
              register={register("ownerSurname")}
            />
          </FormGrid>
        </FormSection>

        {/* Información del Host */}
        <FormSection title="Información del Establecimiento">
          <FormInput
            label="Nombre del establecimiento"
            placeholder="Nombre del host"
            register={register("hostName")}
            error={errors.hostName?.message}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Selecciona la ubicación en el mapa o escribe una dirección:
            </p>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <DynamicMap onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          <FormInput
            label="Dirección"
            placeholder="Dirección completa"
            register={register("address")}
            error={errors.address?.message}
            required
          />

          <FormInput
            label="Descripción"
            type="textarea"
            placeholder="Describe las características del establecimiento..."
            register={register("description")}
            rows={4}
          />
        </FormSection>

        {/* Mensajes de estado */}
        {error && (
          <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-100 border border-green-300 rounded text-green-700">
            {success}
          </div>
        )}

        {/* Botón de envío */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando...
              </div>
            ) : (
              "Crear Host"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
