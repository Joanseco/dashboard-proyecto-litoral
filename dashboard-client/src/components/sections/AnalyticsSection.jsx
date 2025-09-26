import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Users, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";
import StatsCard from "../ui/StatsCard";

const API_BASE_URL = "http://localhost:5000/api";
const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']; // Colores para el gráfico de pastel

// Función auxiliar para obtener datos de un endpoint
const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/analytics/${endpoint}`);
    if (!response.ok) {
        throw new Error(`Error al cargar ${endpoint}`);
    }
    return response.json();
};

const AnalyticsSection = () => {
  // Estados para almacenar la data
  const [stats, setStats] = useState({
    totalSales: 24567, // Valor por defecto
    newUsers: 12483, 
    conversion: 3.21,
    orders: 1847,
  }); 
  const [chartData, setChartData] = useState([]); 
  const [deviceData, setDeviceData] = useState([]); 
  const [activity, setActivity] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Ejecuta las 3 llamadas que devuelven data variable y la actividad reciente
        const [salesChart, pieChart, recentActivityData] = await Promise.all([
          fetchData('sales-data'), // Endpoint 1: Gráfico Ventas
          fetchData('pie-data'),   // Endpoint 2: Gráfico Dispositivos
          fetchData('activity'),  // Endpoint 3: Actividad Reciente
        ]);

        // Nota: Asumimos que los datos de las Stats Cards (Endpoint 4)
        // son más complejos. Por ahora, dejamos los valores hardcoded 
        // o puedes hacer una llamada adicional si tienes un endpoint /api/stats

        setChartData(salesChart);
        setDeviceData(pieChart);
        setActivity(recentActivityData);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la data de analytics:", err);
        setError("Error al conectar con la API para cargar gráficos.");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // --- Manejo de Estados de Carga/Error ---
  
  // Puedes usar esta lógica para envolver todo el contenido
  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando dashboard de analíticas...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-center text-red-600 bg-red-100 border border-red-400 rounded-lg">❌ {error}</div>;
  }

  // --- Renderizado Principal ---
  return (
    <>
      {/* 1. Stats Cards (Usando el estado 'stats') */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Usuarios Totales"
          value={stats.newUsers.toLocaleString()} // Formateo de números
          change={12.5} // Mantengo el cambio estático por ahora
          icon={Users}
          color="bg-blue-500"
        />
        <StatsCard
          title="Ventas Totales"
          value={`$${stats.totalSales.toLocaleString()}`}
          change={8.2}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatsCard
          title="Conversión"
          value={`${stats.conversion}%`}
          change={-2.4}
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <StatsCard
          title="Pedidos"
          value={stats.orders.toLocaleString()}
          change={15.3}
          icon={ShoppingCart}
          color="bg-orange-500"
        />
      </div>

      {/* 2. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ventas y Usuarios
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            {/* !!! CAMBIO CRÍTICO: Usar chartData en lugar de salesData !!! */}
            <BarChart data={chartData}> 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="usuarios" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dispositivos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              {/* !!! CAMBIO CRÍTICO: Usar deviceData en lugar de pieData !!! */}
              <Pie
                data={deviceData} 
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {/* Usar deviceData.map y PIE_COLORS */}
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {/* !!! CAMBIO CRÍTICO: Usar deviceData para la leyenda !!! */}
            {deviceData.map((item, index) => ( 
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Line Chart (Utiliza los mismos datos del BarChart) */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tendencia de Crecimiento
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          {/* !!! CAMBIO CRÍTICO: Usar chartData en lugar de salesData !!! */}
          <LineChart data={chartData}> 
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="usuarios"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: "#06b6d4", strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h3>
        <div className="space-y-4">
          {/* !!! CAMBIO CRÍTICO: Usar el estado 'activity' en lugar de recentActivity !!! */}
          {activity.map((item) => ( 
            <div
              key={item.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {/* Aseguramos que 'item.user' exista antes de dividirlo */}
                  {item.user ? item.user.split(" ").map((n) => n[0]).join("") : 'SY'}
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{item.user}</p>
                  <p className="text-sm text-gray-600">{item.action}</p>
                </div>
              </div>
              <div className="text-right">
                {item.amount && (
                  <p className="font-semibold text-green-600">
                    {item.amount}
                  </p>
                )}
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
          {activity.length === 0 && <p className="text-center text-gray-500 py-4">No hay actividad reciente.</p>}
        </div>
      </div>
    </>
  );
};

export default AnalyticsSection;