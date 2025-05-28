import { useEffect, useState } from "react";
import { Host } from "@/types/host";

export function useHost(hostId: number) {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/hosts/${hostId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setHost(data);
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

  return { host, setHost, loading, error };
}
