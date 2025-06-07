"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Host } from "@/types/host";
import Modal from "@/components/ui/Modal/Modal";
import Header from "@/components/layout/header/Header";
import { useSearchParams } from "next/navigation";
import { database } from "@/config/firebase";
import { ref, onValue } from "firebase/database";

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
  const [hosts, setHosts] = useState<Host[]>([]);
  const [initialLocation, setInitialLocation] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  useEffect(() => {
    if (location) {
      setInitialLocation(location);
    }
  }, [location]);

  useEffect(() => {
    // Subscribe to hosts updates
    const hostsRef = ref(database, "hosts");
    const unsubscribe = onValue(hostsRef, (snapshot) => {
      const hostsData: Host[] = [];
      snapshot.forEach((childSnapshot) => {
        const host = childSnapshot.val();
        hostsData.push({
          ...host,
          id: childSnapshot.key,
          calendarSelected: host.calendarSelected || [],
          calendarNew: [],
        });
      });
      setHosts(hostsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleMarkerClick = (host: Host) => {
    setSelectedHost(host);
  };

  return (
    <>
      <Header />
      <Map
        hosts={hosts}
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
    </>
  );
}
