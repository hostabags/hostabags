import { ReactNode } from 'react';

interface CardStatsProps {
  icon: ReactNode;
  text: string;
  reserves: number;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  numberColor: string;
}

export const CardStats = ({ 
  icon, 
  text, 
  reserves, 
  bgColor, 
  iconBgColor, 
  textColor, 
  numberColor 
}: CardStatsProps) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg`}>
      <div className="flex items-center">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className={`text-sm font-medium ${textColor}`}>{text}</p>
          <p className={`text-2xl font-bold ${numberColor}`}>{reserves || 0}</p>
        </div>
      </div>
    </div>
  );
}; 