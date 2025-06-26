'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (location) {
      router.push(`/map-page?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="flex items-center border rounded-full overflow-hidden p-2">
      <input
        type="text"
        placeholder="Search location"
        className="px-4 py-2 w-full outline-none"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button 
        onClick={handleSearch}
        className="p-2"
      >
        {/* Search icon placeholder */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
} 