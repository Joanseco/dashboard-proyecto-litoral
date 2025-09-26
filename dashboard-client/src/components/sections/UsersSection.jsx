import React, { useState, useEffect } from 'react';

// Si tenías los datos estáticos aquí, coméntalos o elimínalos.
// import { users as staticUsers } from '../../data/dashboardData'; 

const API_BASE_URL = 'http://localhost:5000/api'; // Definimos la base de la API

const UsersSection = () => {
    // Definimos el estado para almacenar los usuarios y el estado de la carga
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // 1. Llamada al endpoint de la API
                const response = await fetch(`${API_BASE_URL}/users`);
                
                // 2. Manejo de errores HTTP
                if (!response.ok) {
                    throw new Error(`Error HTTP! Estado: ${response.status}`);
                }
                
                // 3. Convertir la respuesta a JSON
                const data = await response.json();
                
                // 4. Actualizar el estado con los datos reales
                setUsers(data);
                setError(null);

            } catch (err) {
                console.error("Error al obtener usuarios:", err);
                setError('No se pudieron cargar los datos de usuarios. Asegúrate de que la API está corriendo.');
            } finally {
                // 5. Finalizar el estado de carga
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

    // --- Renderizado de Estados ---

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                <svg className="animate-spin h-5 w-5 mr-3 inline text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                Cargando lista de usuarios...
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
    
    // Si no hay usuarios
    if (users.length === 0) {
        return <div className="p-6 text-center text-gray-500">No hay usuarios registrados.</div>;
    }

    // --- Renderizado Principal (Tabla) ---

    return (
        <section className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gestión de Usuarios</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registro</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                        user.role === 'Moderador' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UsersSection;