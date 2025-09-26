// server.js

// 1. Importaciones y configuración de entorno
require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.API_PORT || 5000;

// 2. Middleware
app.use(cors()); 
app.use(express.json()); 

// Variable global para la conexión a la DB
let db;

// 3. Función de Conexión a la Base de Datos
async function connectToDatabase() {
    try {
        db = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('✅ Conexión a MySQL establecida correctamente.');
        return db;
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1); 
    }
}

// 4. Rutas de la API (Endpoints)
// ------------------------------------

// RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send(`API de Dashboard funcionando en el puerto ${PORT}`);
});

// 4.1. ENDPOINT: /api/users (USUARIOS)
// Obtiene la lista de usuarios.
app.get('/api/users', async (req, res) => {
    try {
        const query = 'SELECT id, name, email, role, status, joined_date FROM Users ORDER BY joined_date DESC';
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener usuarios' });
    }
});

// 4.2. ENDPOINT: /api/sales (VENTAS)
// Obtiene la lista de ventas, incluyendo el nombre del cliente y el producto.
app.get('/api/sales', async (req, res) => {
    try {
        const query = `
            SELECT 
                S.id, 
                P.name AS product, 
                U.name AS customer, 
                S.amount, 
                S.status, 
                DATE_FORMAT(S.sale_date, '%Y-%m-%d') AS date
            FROM Sales S
            JOIN Products P ON S.product_id = P.id
            JOIN Users U ON S.customer_id = U.id
            ORDER BY S.sale_date DESC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener ventas' });
    }
});

// 4.3. ENDPOINT: /api/analytics/sales-data (DATOS DE GRÁFICO DE VENTAS)
// Simula los datos para el gráfico de barras (ventas vs. usuarios por mes).
app.get('/api/analytics/sales-data', async (req, res) => {
    // Nota: Esto es un DUMMY de datos agregados. La consulta real sería compleja (GROUP BY mes).
    // Para simplificar, devolvemos los datos estáticos que ya tenías, pero desde la API.
    const mockSalesData = [
        { name: 'Ene', ventas: 4000, usuarios: 2400 },
        { name: 'Feb', ventas: 3000, usuarios: 1398 },
        { name: 'Mar', ventas: 2000, usuarios: 9800 },
        { name: 'Abr', ventas: 2780, usuarios: 3908 },
        { name: 'May', ventas: 1890, usuarios: 4800 },
        { name: 'Jun', ventas: 2390, usuarios: 3800 },
        { name: 'Jul', ventas: 3490, usuarios: 4300 },
    ];
    res.json(mockSalesData);
});

// 4.4. ENDPOINT: /api/analytics/pie-data (DATOS DE GRÁFICO DE DISPOSITIVOS)
// Simula datos para el gráfico de pastel (distribución de usuarios/ventas por fuente).
app.get('/api/analytics/pie-data', async (req, res) => {
    // En un caso real, esto requeriría datos de sesiones/dispositivos.
    const mockPieData = [
        { name: 'Desktop', value: 400, color: '#8b5cf6' },
        { name: 'Mobile', value: 300, color: '#06b6d4' },
        { name: 'Tablet', value: 200, color: '#10b981' },
        { name: 'Otros', value: 100, color: '#f59e0b' },
    ];
    res.json(mockPieData);
});


// 4.5. ENDPOINT: /api/analytics/activity (ACTIVIDAD RECIENTE)
// Obtiene el registro de actividad.
app.get('/api/analytics/activity', async (req, res) => {
    try {
        const query = `
            SELECT 
                RA.id, 
                U.name AS user, 
                RA.description AS action, 
                RA.amount, 
                RA.activity_time
            FROM RecentActivity RA
            LEFT JOIN Users U ON RA.user_id = U.id
            ORDER BY RA.activity_time DESC
            LIMIT 10 -- Limitar a las 10 actividades más recientes
        `;
        const [rows] = await db.query(query);

        // Formateo de tiempo simple (ej: "hace 5 min") para simular el formato del frontend
        const formattedActivity = rows.map(item => ({
            id: item.id,
            user: item.user || 'Sistema',
            action: item.action,
            amount: item.amount ? `$${parseFloat(item.amount).toFixed(2)}` : null,
            time: 'Justo ahora' // En un entorno real se calcularía la diferencia
        }));

        res.json(formattedActivity);
    } catch (error) {
        console.error('Error al obtener actividad:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener actividad' });
    }
});


// 5. Inicializar el Servidor
async function startServer() {
    await connectToDatabase();
    
    app.listen(PORT, () => {
        console.log(`📡 Servidor Express escuchando en http://localhost:${PORT}`);
    });
}

startServer();