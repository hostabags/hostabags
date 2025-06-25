"use client";

import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createHostWithUid, createUserWithUid } from "@/services/firebaseService";
import { geocodeAddress } from "@/utils/geocoding";
import { firebaseConfig } from "@/config/firebase";


interface Props {
  onHostCreated: () => void;
}

export function CreateHostForm({ onHostCreated }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ownerName: "",
    ownerSurname: "",
    hostName: "",
    address: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // 1. Geocode address
    const coordinates = await geocodeAddress(formData.address);
    if (!coordinates) {
      setError("No se pudo verificar la dirección. Inténtalo de nuevo con una dirección válida.");
      setLoading(false);
      return;
    }

    const secondaryApp = initializeApp(firebaseConfig, "secondary-app-for-host-creation");
    const secondaryAuth = getAuth(secondaryApp);

    try {
      // 2. Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        formData.email,
        formData.password
      );
      const { uid } = userCredential.user;

      // 3. Create user profile in DB
      await createUserWithUid(uid, {
        email: formData.email,
        name: formData.ownerName,
        surname: formData.ownerSurname,
        role: "host",
      });

      // 4. Create host profile in DB
      await createHostWithUid(uid, {
        name: formData.hostName,
        address: formData.address,
        lat: coordinates.lat,
        lng: coordinates.lng,
        description: formData.description,
        calendarSelected: [],
      });

      setSuccess("¡Host creado con éxito!");
      onHostCreated();
      setFormData({
        email: "",
        password: "",
        ownerName: "",
        ownerSurname: "",
        hostName: "",
        address: "",
        description: "",
      });
    } catch (error: any) {
      setError(`Error al crear el host: ${error.message}`);
    } finally {
      // We don't need to delete the secondary app manually in v9+ of firebase sdk for client
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Crear nuevo Host</h2>
      
      <input type="email" name="email" placeholder="Email del propietario" value={formData.email} onChange={handleChange} required style={{ padding: '0.5rem' }} />
      <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={{ padding: '0.5rem' }} />
      <input type="text" name="ownerName" placeholder="Nombre del propietario" value={formData.ownerName} onChange={handleChange} required style={{ padding: '0.5rem' }} />
      <input type="text" name="ownerSurname" placeholder="Apellido del propietario" value={formData.ownerSurname} onChange={handleChange} style={{ padding: '0.5rem' }} />
      
      <hr />

      <input type="text" name="hostName" placeholder="Nombre del establecimiento" value={formData.hostName} onChange={handleChange} required style={{ padding: '0.5rem' }} />
      <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required style={{ padding: '0.5rem' }} />
      <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} style={{ padding: '0.5rem' }}></textarea>

      <button type="submit" disabled={loading} style={{ padding: '0.75rem', cursor: 'pointer' }}>
        {loading ? "Creando..." : "Crear Host"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
} 