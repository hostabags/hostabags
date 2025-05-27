"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import hostsData from "@/data/data.danilo.json";
import { Host } from "@/types/host";
import Modal from "@/components/ui/Modal/Modal";
import Header from "@/components/layout/header/Header";
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const [initialLocation, setInitialLocation] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      setInitialLocation(location);
    }
  }, [location]);

  const handleMarkerClick = (host: Host) => {
    setSelectedHost(host);
  };

  return (
    <div className="relative w-full max-screen">
      <Header />
      <Map
        hosts={hostsData.hosts.map(host => ({
          ...host,
          id: Number(host.id),
          calendarSelected: [],
          calendarNew: []
        }))}
        onMarkerClick={handleMarkerClick}
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
    </div>
  );
}
