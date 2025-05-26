const MAPTILER_API_KEY = "Pv5o8mR7VWccLvRVSQfg";

export const MAP_CONFIG = {
  MAPTILER_URL: `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`,
  MAPTILER_ATTRIBUTION: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  
  // Configuración por defecto
  DEFAULT_CENTER: [41.3851, 2.1734] as [number, number], // Barcelona
  DEFAULT_ZOOM: 13,
  ZOOM_LEVEL: 15,
  
  // Límites del mapa
  MIN_ZOOM: 5,
  MAX_ZOOM: 18,
}; 