import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Host } from '@/types/host';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import SearchBox from './SearchBox';
import MapControls from './MapControls';
import { MAP_CONFIG } from '@/config/map';
import { useEffect, useState } from 'react';
import HostPopup from './HostPopup';
import './hostPopup.scss';

// Icono personalizado para los marcadores
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C10.477 0 6 4.477 6 10c0 7 10 20 10 20s10-13 10-20c0-5.523-4.477-10-10-10z" fill="#4f46e5"/>
      <path d="M16 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" fill="white"/>
      <path d="M16 8c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2z" fill="#4f46e5"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
  shadowUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="10" rx="20" ry="10" fill="rgba(0,0,0,0.2)"/>
    </svg>
  `),
  shadowSize: [40, 20],
  shadowAnchor: [20, 10]
});

interface MapProps {
  hosts: Host[];
  onMarkerClick: (host: Host) => void;
  initialLocation: string | null;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({ hosts, onMarkerClick, initialLocation }: MapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(MAP_CONFIG.DEFAULT_CENTER);

  useEffect(() => {
    const getCoordsFromLocation = async (location: string): Promise<[number, number] | null> => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
          // Use the first result
          const { lat, lon } = data[0];
          console.log(`Geocoded ${location} to ${lat}, ${lon}`);
          return [parseFloat(lat), parseFloat(lon)];
        } else {
          console.warn(`No results found for location: ${location}`);
          return null;
        }
      } catch (error) {
        console.error(`Error geocoding location ${location}:`, error);
        return null;
      }
    };

    if (initialLocation) {
      getCoordsFromLocation(initialLocation).then(coords => {
        if (coords) {
          setMapCenter(coords);
        }
      });
    } else {
      setMapCenter(MAP_CONFIG.DEFAULT_CENTER);
    }
  }, [initialLocation]); // Re-run effect when initialLocation changes

  return (
    <MapContainer
      center={MAP_CONFIG.DEFAULT_CENTER}
      zoom={MAP_CONFIG.DEFAULT_ZOOM}
      style={{ height: 'calc(100vh - 64px)', width: '100%' }}
      zoomControl={false}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
    >
      <ChangeView center={mapCenter} zoom={MAP_CONFIG.DEFAULT_ZOOM} />
      <TileLayer
        attribution={MAP_CONFIG.MAPTILER_ATTRIBUTION}
        url={MAP_CONFIG.MAPTILER_URL}
      />
      <SearchBox />
      <MapControls />
      {hosts.map((host) => (
        <Marker
          key={host.id}
          position={[host.lat, host.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => onMarkerClick(host),
          }}
        >
          <Popup>
            <HostPopup 
              host={host} 
              onBookNow={() => onMarkerClick(host)}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 