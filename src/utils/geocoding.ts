export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.warn(`No results found for location: ${address}`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding location ${address}:`, error);
    return null;
  }
}; 