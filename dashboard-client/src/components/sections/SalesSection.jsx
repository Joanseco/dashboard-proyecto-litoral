import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

const SalesSection = () => {
    // 1. Estados para la data, carga y error
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Lógica de Fetch
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/sales`);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                
                const data = await response.json();
                setSales(data);
                setError(null);

            } catch (err) {
                console.error("Error al obtener ventas:", err);
                setError('No se pudieron cargar los datos de ventas. Asegúrate de que la API está corriendo.');
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []); 

    // --- Renderizado de Estados ---

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                <svg className="animate-spin h-5 w-5 mr-3 inline text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                Cargando historial de ventas...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600 bg-red-100 border border-red-400 rounded-lg">
                ❌ Error: {error}
            </div>
        );
    }
    
    if (sales.length === 0) {
        return <div className="p-6 text-center text-gray-500">No se encontraron registros de ventas.</div>;
    }

    // --- Renderizado Principal (Tabla) ---

    return (
        <section className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Historial de Ventas</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{`$${parseFloat(sale.amount).toFixed(2)}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        sale.status === 'Completada' ? 'bg-green-100 text-green-800' :
                                        sale.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {sale.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default SalesSection;