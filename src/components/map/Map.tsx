import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Host } from '@/types/host';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import SearchBox from './SearchBox';
import MapControls from './MapControls';
import { MAP_CONFIG } from '@/config/map';

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
}

export default function Map({ hosts, onMarkerClick }: MapProps) {
  return (

    <MapContainer

      center={MAP_CONFIG.DEFAULT_CENTER}
      zoom={MAP_CONFIG.DEFAULT_ZOOM}
      style={{ height: '100vh', width: '100%' }}
      zoomControl={false}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
    >
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