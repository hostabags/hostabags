import { useMap } from 'react-leaflet';
import { useState } from 'react';
import { MAP_CONFIG } from '@/config/map';

export default function MapControls() {
  const map = useMap();
  const [isDraggingMode, setIsDraggingMode] = useState(false);

  const centerOnUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], MAP_CONFIG.ZOOM_LEVEL);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación.");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  const toggleDragMode = () => {
    setIsDraggingMode(!isDraggingMode);
    if (!isDraggingMode) {
      // Cambiar el cursor a una X verde con borde negro
      const mapContainer = map.getContainer();
      mapContainer.style.cursor = 'none';
      
      // Creamos y agregamos el cursor personalizado
      const customCursor = document.createElement('div');
      customCursor.id = 'custom-cursor';
      customCursor.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        animation: pulse 1.5s infinite;
      `;

      // Agregamos los estilos de la animación
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);

      customCursor.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6L18 18M6 18L18 6" 
            stroke="#22c55e" 
            stroke-width="3" 
            stroke-linecap="round"
            stroke-linejoin="round"
            filter="drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black)"
          />
        </svg>
      `;
      document.body.appendChild(customCursor);

      // Mover el cursor personalizado con el mouse
      const moveCursor = (e: MouseEvent) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
      };
      document.addEventListener('mousemove', moveCursor);
      
      // Agregar evento de clic al mapa
      map.once('click', (e) => {
        map.setView(e.latlng, MAP_CONFIG.ZOOM_LEVEL);
        setIsDraggingMode(false);
        mapContainer.style.cursor = '';
        // Remover el cursor personalizado y el evento
        document.body.removeChild(customCursor);
        document.head.removeChild(style);
        document.removeEventListener('mousemove', moveCursor);
      });
    } else {
      // Restaurar el cursor normal
      map.getContainer().style.cursor = '';
      // Remover el cursor personalizado si existe
      const customCursor = document.getElementById('custom-cursor');
      const style = document.querySelector('style');
      if (customCursor) {
        document.body.removeChild(customCursor);
      }
      if (style) {
        document.head.removeChild(style);
      }
    }
  };

  const zoomIn = () => {
    map.zoomIn();
  };

  const zoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute bottom-20 right-4 z-[1000] flex flex-col gap-2">
      {/* Controles de zoom */}
      <button
        onClick={zoomIn}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Acercar"
        title="Acercar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <button
        onClick={zoomOut}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Alejar"
        title="Alejar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      {/* Separador visual */}
      <div className="h-px bg-gray-300 my-1" />

      {/* Controles de ubicación */}
      <button
        onClick={centerOnUserLocation}
        className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Centrar en mi ubicación"
        title="Centrar en mi ubicación"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <button
        onClick={toggleDragMode}
        className={`p-2 rounded-lg shadow-lg transition-colors ${
          isDraggingMode ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
        }`}
        aria-label="Modo arrastrar"
        title="Haz clic en el mapa para centrarlo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      </button>
    </div>
  );
} 