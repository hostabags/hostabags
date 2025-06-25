import { useState, useEffect } from "react";
import { HostsService } from "@/services/firebase";
import type { Host } from "@/types/host";

export function useHosts() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = HostsService.onHostsUpdate(
      (hosts) => {
        setHosts(hosts);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { hosts, loading, error };
}

export function useHost(hostId: string) {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hostId) {
      setHost(null);
      setLoading(false);
      return;
    }

    const unsubscribe = HostsService.onHostUpdate(
      hostId,
      (host) => {
        setHost(host);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [hostId]);

  return { host, loading, error };
}

export function useHostsByOwner(ownerId: string) {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ownerId) {
      setHosts([]);
      setLoading(false);
      return;
    }

    const unsubscribe = HostsService.onHostsByOwnerUpdate(
      ownerId,
      (hosts) => {
        setHosts(hosts);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [ownerId]);

  return { hosts, loading, error };
} 