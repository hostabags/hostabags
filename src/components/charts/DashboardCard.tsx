import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function DashboardCard({ icon, title, description, className = "", children }: DashboardCardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl cursor-pointer ${className}`}
    >
      <div className="flex items-center mb-2">
        <span className="mr-2">{icon}</span>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      {children}
    </div>
  );
} 