import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Host } from '@/types/host';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import SearchBox from './SearchBox';
import MapControls from './MapControls';
import { MAP_CONFIG } from '@/config/map';
import { useEffect, useState } from 'react';

const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
      style={{ height: '100vh', width: '100%' }}
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
          icon={icon}
          eventHandlers={{
            click: () => onMarkerClick(host),
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{host.name}</h3>
              <p>{host.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  
  );
} 