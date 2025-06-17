import { useEffect, useState } from "react";
import type { Host } from "@/types/host";
import { database } from "@/config/firebase";
import { ref, onValue, update } from "firebase/database";

export function useHost(hostId: string) {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      console.log(`hosts/${hostId}`);
      const hostRef = ref(database, `hosts/${hostId}`);

      // Subscribe to real-time updates
      const unsubscribe = onValue(
        hostRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log("data:" + JSON.stringify(data));
            // Cargar fechas guardadas en localStorage
            const storedDates = localStorage.getItem(`calendarNew-${hostId}`);
            console.log("dates local:" + storedDates);

            const calendarNew = storedDates ? JSON.parse(storedDates) : [];
            console.log("calendar new:" + calendarNew);

            // Asegurar que calendarSelected sea un array
            const calendarSelected = Array.isArray(data.calendarSelected)
              ? data.calendarSelected
              : [];

            // Añadir calendarNew solo en frontend
            setHost({
              ...data,
              calendarNew,
              calendarSelected,
            });
          } else {
            setHost(null);
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

  const setHostLocal = (updatedHost: Host) => {
    try {
      localStorage.setItem(
        `calendarNew-${updatedHost.id}`,
        JSON.stringify(updatedHost.calendarNew ?? [])
      );
      console.log("Hasta aqui funciona 2");
    } catch (err) {
      console.error("Error updating host:", err);
      setError("Failed to update host data");
    }
  };

  return { host, setHostLocal, loading, error };
}
