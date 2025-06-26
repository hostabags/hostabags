"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardCard from './DashboardCard';

// Datos hardcodeados para los gráficos
const userVsHostData = [
  { name: 'Usuarios', value: 150, color: '#8884d8' },
  { name: 'Hosts', value: 45, color: '#82ca9d' },
];

const monthlyDemandData = [
  { month: 'Ene', alta: 65, media: 45, baja: 25 },
  { month: 'Feb', alta: 70, media: 50, baja: 30 },
  { month: 'Mar', alta: 80, media: 55, baja: 35 },
  { month: 'Abr', alta: 85, media: 60, baja: 40 },
  { month: 'May', alta: 90, media: 65, baja: 45 },
  { month: 'Jun', alta: 95, media: 70, baja: 50 },
  { month: 'Jul', alta: 100, media: 75, baja: 55 },
  { month: 'Ago', alta: 95, media: 70, baja: 50 },
  { month: 'Sep', alta: 85, media: 60, baja: 40 },
  { month: 'Oct', alta: 75, media: 50, baja: 30 },
  { month: 'Nov', alta: 65, media: 40, baja: 25 },
  { month: 'Dic', alta: 60, media: 35, baja: 20 },
];

const growthData = [
  { month: 'Ene', usuarios: 120, hosts: 35 },
  { month: 'Feb', usuarios: 125, hosts: 37 },
  { month: 'Mar', usuarios: 130, hosts: 38 },
  { month: 'Abr', usuarios: 135, hosts: 40 },
  { month: 'May', usuarios: 140, hosts: 42 },
  { month: 'Jun', usuarios: 145, hosts: 43 },
  { month: 'Jul', usuarios: 150, hosts: 45 },
  { month: 'Ago', usuarios: 155, hosts: 47 },
  { month: 'Sep', usuarios: 160, hosts: 48 },
  { month: 'Oct', usuarios: 165, hosts: 50 },
  { month: 'Nov', usuarios: 170, hosts: 52 },
  { month: 'Dic', usuarios: 175, hosts: 55 },
];

export default function DashboardCharts() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Gráfico de Usuarios vs Hosts */}
        <DashboardCard
          icon="📊"
          title="Distribución de Usuarios vs Hosts"
          description="Proporción de usuarios y hosts en la plataforma"
        >
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={userVsHostData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userVsHostData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        {/* Gráfico de Demanda por Meses */}
        <DashboardCard
          icon="📈"
          title="Demanda del Servicio por Meses"
          description="Niveles de demanda durante el año"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="alta" fill="#ef4444" name="Alta Demanda" />
              <Bar dataKey="media" fill="#f59e0b" name="Demanda Media" />
              <Bar dataKey="baja" fill="#10b981" name="Baja Demanda" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      {/* Gráfico de Crecimiento Anual */}
      <DashboardCard 
        className="w-full"
        icon="📈"
        title="Crecimiento de Usuarios y Hosts Durante el Año"
        description="Evolución mensual de usuarios y hosts"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="usuarios" 
              stroke="#8884d8" 
              strokeWidth={3}
              name="Usuarios"
              dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="hosts" 
              stroke="#82ca9d" 
              strokeWidth={3}
              name="Hosts"
              dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <DashboardCard
          icon="👥"
          title="Total Usuarios"
          description="Número total de usuarios registrados"
        >
          <p className="text-3xl font-bold text-blue-600">175</p>
          <p className="text-sm text-gray-500">+5 este mes</p>
        </DashboardCard>
        
        <DashboardCard
          icon="🏠"
          title="Total Hosts"
          description="Número total de hosts activos"
        >
          <p className="text-3xl font-bold text-green-600">55</p>
          <p className="text-sm text-gray-500">+3 este mes</p>
        </DashboardCard>
        
        <DashboardCard
          icon="📊"
          title="Tasa de Conversión"
          description="Porcentaje de usuarios que son hosts"
        >
          <p className="text-3xl font-bold text-purple-600">31.4%</p>
          <p className="text-sm text-gray-500">Usuarios que son hosts</p>
        </DashboardCard>
      </div>
    </div>
  );
} 