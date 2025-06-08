import { useEffect, useState } from "react";
import type { Host } from "@/types/host";
import { database } from "@/config/firebase";
import { ref, onValue, update } from "firebase/database";

export function useHost(hostId: string) {
  const [host, setHostState] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const hostRef = ref(database, `hosts/${hostId}`);

      // Subscribe to real-time updates
      const unsubscribe = onValue(
        hostRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Cargar fechas guardadas en localStorage
            const storedDates = localStorage.getItem(`calendarNew-${hostId}`);
            const calendarNew = storedDates ? JSON.parse(storedDates) : [];

            // Asegurar que calendarSelected sea un array
            const calendarSelected = Array.isArray(data.calendarSelected)
              ? data.calendarSelected
              : [];

            // Añadir calendarNew solo en frontend
            setHostState({
              ...data,
              calendarNew,
              calendarSelected,
            });
          } else {
            setHostState(null);
          }
          setError(null);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching host data:", error);
          setError("Failed to load calendar data");
          setLoading(false);
        }
      );

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up host listener:", err);
      setError("Failed to load calendar data");
      setLoading(false);
    }
  }, [hostId]);

  const setHost = async (updatedHost: Host) => {
    try {
      // Save calendarNew to localStorage
      localStorage.setItem(
        `calendarNew-${updatedHost.id}`,
        JSON.stringify(updatedHost.calendarNew ?? [])
      );

      // Asegurar que calendarSelected sea un array antes de actualizar
      const calendarSelected = Array.isArray(updatedHost.calendarSelected)
        ? updatedHost.calendarSelected
        : [];

      // Update host in Firebase
      const hostRef = ref(database, `hosts/${updatedHost.id}`);
      await update(hostRef, {
        name: updatedHost.name,
        address: updatedHost.address,
        lat: updatedHost.lat,
        lng: updatedHost.lng,
        calendarSelected,
      });

      setHostState(updatedHost);
    } catch (err) {
      console.error("Error updating host:", err);
      setError("Failed to update host data");
    }
  };

  return { host, setHost, loading, error };
}
