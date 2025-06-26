"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Host } from "@/types/host";
import Modal from "@/components/ui/Modal/Modal";
import { useSearchParams } from "next/navigation";
import { useHosts } from "@/hooks/useHosts";

const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center">
      Cargando mapa...
    </div>
  ),
});

export default function MapPage() {
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [initialLocation, setInitialLocation] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const { hosts, loading, error } = useHosts();

  useEffect(() => {
    if (location) {
      setInitialLocation(location);
    }
  }, [location]);

  const handleMarkerClick = (host: Host) => {
    setSelectedHost(host);
  };

  const handlePopupClose = () => {
    // Cuando se cierra el popup del mapa, también cerrar el modal
    setSelectedHost(null);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Cargando hosts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Map
        hosts={hosts}
        onMarkerClick={handleMarkerClick}
        onPopupClose={handlePopupClose}
        initialLocation={initialLocation}
      />
      {selectedHost && (
        <Modal
          id={selectedHost.id}
          address={selectedHost.address}
          name={selectedHost.name}
          setSelectedHost={setSelectedHost}
        />
      )}
    </>
  );
}
