import { useEffect, useState } from "react";
import type { Host } from "@/types/host";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";

export function useHost(hostId: string) {
  const [host, setHost] = useState<Host | null>(null);
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

            const calendarSelected = Array.isArray(data.calendarSelected)
              ? data.calendarSelected
              : [];

            setHost({
              ...data,
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

  return { host, loading, error };
}
