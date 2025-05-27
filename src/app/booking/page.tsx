"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import hostsData from "@/data/dataCris.json";
import { Host } from "@/types/host";
import Modal from "@/components/ui/Modal/Modal";

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


  const handleMarkerClick = (host: Host) => {
    setSelectedHost(host);
  };

  return (
    <div className="relative w-full h-screen">
     
      <Map
        hosts={hostsData.hosts.map(host => ({
          ...host,
          id: Number(host.id),
          calendarSelected: [],
          calendarNew: []
        }))}
        onMarkerClick={handleMarkerClick}
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
