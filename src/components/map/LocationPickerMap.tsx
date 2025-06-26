import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MAP_CONFIG } from '@/config/map';
import { useState, useEffect } from 'react';

const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationPickerMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

interface LocationMarkerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

function LocationMarker({ onLocationSelect }: LocationMarkerProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Reverse geocode to get address
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          onLocationSelect(lat, lng, data.display_name || 'Dirección no encontrada');
        })
        .catch(err => {
            console.error("Error during reverse geocoding:", err);
            onLocationSelect(lat, lng, 'Error al obtener la dirección');
        })
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
}

export default function LocationPickerMap({ onLocationSelect }: LocationPickerMapProps) {
  return (
    <MapContainer
      center={MAP_CONFIG.DEFAULT_CENTER}
      zoom={MAP_CONFIG.DEFAULT_ZOOM}
      style={{ height: '400px', width: '100%' }}
      zoomControl={true}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
    >
      <TileLayer
        attribution={MAP_CONFIG.MAPTILER_ATTRIBUTION}
        url={MAP_CONFIG.MAPTILER_URL}
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
} 