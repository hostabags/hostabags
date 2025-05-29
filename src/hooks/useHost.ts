import { useEffect, useState } from "react";
import { Host } from "@/types/host";

export function useHost(hostId: number) {
  const [host, setHostState] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/hosts/${hostId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Cargar fechas guardadas en localStorage
        const storedDates = localStorage.getItem(`calendarNew-${hostId}`);
        const calendarNew = storedDates ? JSON.parse(storedDates) : [];

        // Añadir calendarNew solo en frontend
        setHostState({ ...data, calendarNew });
        setError(null);

      } catch (err) {
        console.error("Error fetching host data:", err);
        setError("Failed to load calendar data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [hostId]);
  const setHost = (updatedHost: Host) => {

    localStorage.setItem(
      `calendarNew-${updatedHost.id}`,
      JSON.stringify(updatedHost.calendarNew ?? [])
    );


    setHostState(updatedHost);
  };
  return { host, setHost, loading, error };
}
