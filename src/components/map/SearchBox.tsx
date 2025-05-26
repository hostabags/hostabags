import { useState } from 'react';
import { useMap } from 'react-leaflet';

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const map = useMap();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      // Usamos la API de Nominatim para buscar ubicaciones
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=5`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Centrar el mapa en la ubicación seleccionada
    map.setView([parseFloat(result.lat), parseFloat(result.lon)], 15);
    setResults([]);
    setSearchTerm(result.display_name);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] w-80">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar ubicación..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {isLoading ? '...' : 'Buscar'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result)}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              {result.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 