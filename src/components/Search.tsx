'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './icons/SvgIcons';

export default function Search() {
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (location) {
      router.push(`/map-page?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className={`
        flex items-center border rounded-full overflow-hidden p-2 
        transition-all duration-300 ease-in-out
        ${isFocused 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105' 
          : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
        }
        max-w-md w-full
      `}>
        <input
          type="text"
          placeholder="Buscar ubicación"
          className="px-4 py-2 w-full outline-none bg-transparent transition-all duration-200"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button 
          onClick={handleSearch}
          className="p-2 transition-all duration-200 hover:bg-gray-100 rounded-full hover:scale-110 active:scale-95"
          disabled={!location.trim()}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
} 