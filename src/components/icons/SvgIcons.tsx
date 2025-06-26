import React from "react";

export const ChartIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
    <rect x="3" y="13" width="4" height="8" rx="1.5"/>
    <rect x="9" y="9" width="4" height="12" rx="1.5"/>
    <rect x="15" y="3" width="4" height="18" rx="1.5"/>
  </svg>
);

export const UsersIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-2a4 4 0 1 0-8 0m8 0a4 4 0 1 1-8 0m8 0V7a4 4 0 1 0-8 0v7" />
  </svg>
);

export const HostIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10.75L12 4l9 6.75M4 10v10a1 1 0 0 0 1 1h5m4 0h5a1 1 0 0 0 1-1V10" />
    <rect x="9" y="14" width="6" height="7" rx="1"/>
  </svg>
);

// User Profile Icons
export const ActiveReservationsIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const CompletedReservationsIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CancelledReservationsIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SearchIcon = () => (
  <svg className="h-6 w-6 text-gray-500 transition-colors duration-200 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2" stroke="currentColor" fill="none"/>
    <circle cx="12" cy="12" r="5" strokeWidth="2" stroke="currentColor" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const TikTokIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 17a4 4 0 1 1 4-4V4h3a4 4 0 0 0 4 4" strokeWidth="2" stroke="currentColor" fill="none"/>
  </svg>
);

export const FacebookIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2.5z" strokeWidth="2" stroke="currentColor" fill="none"/>
  </svg>
);

export const LinkedInIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
    <circle cx="8" cy="10" r="2" fill="currentColor"/>
    <path d="M8 12v4" strokeWidth="2" stroke="currentColor"/>
    <path d="M16 10v6" strokeWidth="2" stroke="currentColor"/>
    <path d="M16 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"/>
  </svg>
);

export const TwitterIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6 1A4.1 4.1 0 0 0 12 8.09v.5A11.65 11.65 0 0 1 3 4.6s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.1 4.1 0 0 0-.08-.74A5.94 5.94 0 0 0 22 5.92z" strokeWidth="2" stroke="currentColor" fill="none"/>
  </svg>
);

export const LinkIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 0 1 0 5.656l-3 3a4 4 0 1 1-5.656-5.656l1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 0 1 0-5.656l3-3a4 4 0 1 1 5.656 5.656l-1.5 1.5" />
  </svg>
);

export const LocationIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const HandshakeIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3.5-3.5a2.121 2.121 0 0 1 0-3l3-3a2.121 2.121 0 0 1 3 0l3 3a2.121 2.121 0 0 1 0 3L12 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5l-2-2M15.5 11.5l2-2" />
  </svg>
);

export const StarIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
  </svg>
);

export const NewspaperIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 8h10M7 12h6" />
  </svg>
);

export const FaqIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 3-3 3" />
    <circle cx="12" cy="17" r="1" />
  </svg>
);

export const BookIcon = () => (
  <svg className="w-5 h-5 mr-2 inline-block align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l-7 2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-2z" />
  </svg>
); 