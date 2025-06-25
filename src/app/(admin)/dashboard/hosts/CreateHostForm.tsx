"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createHostWithUid, createUserWithUid } from "@/services/firebaseService";
import { firebaseConfig } from "@/config/firebase";
import { createHostSchema, CreateHostSchema } from "@/validations/hostSchema";
import { geocodeAddress } from "@/utils/geocoding";
import LocationPickerMap from "@/components/map/LocationPickerMap";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import('@/components/map/LocationPickerMap'), {
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
      setError("No se pudo verificar la dirección. Inténtalo de nuevo con una dirección válida.");
      return;
    }

    const secondaryApp = initializeApp(firebaseConfig, "secondary-app-for-host-creation");
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        data.email,
        data.password
      );
      const { uid } = userCredential.user;

      await createUserWithUid(uid, {
        email: data.email,
        name: data.ownerName,
        surname: data.ownerSurname,
        role: "host",
      });

      await createHostWithUid(uid, {
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Crear nuevo Host</h2>
      
      <input type="email" {...register("email")} placeholder="Email del propietario" style={{ padding: '0.5rem' }} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      
      <input type="password" {...register("password")} placeholder="Contraseña" style={{ padding: '0.5rem' }} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <input type="password" {...register("confirmPassword")} placeholder="Confirmar Contraseña" style={{ padding: '0.5rem' }} />
      {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

      <input type="text" {...register("ownerName")} placeholder="Nombre del propietario" style={{ padding: '0.5rem' }} />
      {errors.ownerName && <p style={{ color: 'red' }}>{errors.ownerName.message}</p>}

      <input type="text" {...register("ownerSurname")} placeholder="Apellido del propietario" style={{ padding: '0.5rem' }} />
      
      <hr />

      <input type="text" {...register("hostName")} placeholder="Nombre del establecimiento" style={{ padding: '0.5rem' }} />
      {errors.hostName && <p style={{ color: 'red' }}>{errors.hostName.message}</p>}
      
      <p>Selecciona la ubicación en el mapa o escribe una dirección:</p>
      <DynamicMap onLocationSelect={handleLocationSelect} />
      
      <input type="text" {...register("address")} placeholder="Dirección" style={{ padding: '0.5rem' }} />
      {errors.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}

      <textarea {...register("description")} placeholder="Descripción" style={{ padding: '0.5rem' }}></textarea>

      <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem', cursor: 'pointer' }}>
        {isSubmitting ? "Creando..." : "Crear Host"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
} 