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