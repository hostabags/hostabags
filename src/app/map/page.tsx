"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import hostsData from "@/data/data.danilo.json";
import { Host } from "@/types/host";

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
      <Map hosts={hostsData.hosts} onMarkerClick={handleMarkerClick} />
      {selectedHost && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-[1000]">
          <h2 className="text-xl font-bold mb-2">{selectedHost.name}</h2>
          <p className="text-gray-600 mb-2">{selectedHost.address}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setSelectedHost(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
