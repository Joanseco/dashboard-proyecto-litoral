import { Users, TrendingUp, DollarSign, ShoppingCart, Settings } from 'lucide-react';

export const salesData = [
    { name: 'Ene', ventas: 4000, usuarios: 2400 },
    { name: 'Feb', ventas: 3000, usuarios: 1398 },
    { name: 'Mar', ventas: 2000, usuarios: 9800 },
    { name: 'Abr', ventas: 2780, usuarios: 3908 },
    { name: 'May', ventas: 1890, usuarios: 4800 },
    { name: 'Jun', ventas: 2390, usuarios: 3800 },
    { name: 'Jul', ventas: 3490, usuarios: 4300 },
];

export const pieData = [
    { name: 'Desktop', value: 400, color: '#8b5cf6' },
    { name: 'Mobile', value: 300, color: '#06b6d4' },
    { name: 'Tablet', value: 200, color: '#10b981' },
    { name: 'Otros', value: 100, color: '#f59e0b' },
];

export const recentActivity = [
    { id: 1, user: 'Ana García', action: 'Realizó una compra', time: 'hace 5 min', amount: '$250' },
    { id: 2, user: 'Carlos López', action: 'Se registró', time: 'hace 15 min', amount: null },
    { id: 3, user: 'María Rodríguez', action: 'Actualizó perfil', time: 'hace 1 hora', amount: null },
    { id: 4, user: 'Juan Pérez', action: 'Realizó una compra', time: 'hace 2 horas', amount: '$420' },
];

export const users = [
    { id: 1, name: 'Ana García', email: 'ana@email.com', role: 'Cliente', status: 'Activo', joined: '2024-01-15' },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', role: 'Admin', status: 'Activo', joined: '2023-12-10' },
    { id: 3, name: 'María Rodríguez', email: 'maria@email.com', role: 'Cliente', status: 'Inactivo', joined: '2024-02-20' },
    { id: 4, name: 'Juan Pérez', email: 'juan@email.com', role: 'Cliente', status: 'Activo', joined: '2024-01-08' },
    { id: 5, name: 'Laura Martín', email: 'laura@email.com', role: 'Moderador', status: 'Activo', joined: '2023-11-25' },
];

export const sales = [
    { id: 1, product: 'Producto A', customer: 'Ana García', amount: '$250', status: 'Completada', date: '2024-09-26' },
    { id: 2, product: 'Producto B', customer: 'Juan Pérez', amount: '$420', status: 'Completada', date: '2024-09-25' },
    { id: 3, product: 'Producto C', customer: 'María López', amount: '$180', status: 'Pendiente', date: '2024-09-24' },
    { id: 4, product: 'Producto A', customer: 'Carlos Ruiz', amount: '$310', status: 'Completada', date: '2024-09-23' },
    { id: 5, product: 'Producto D', customer: 'Elena Vega', amount: '$95', status: 'Cancelada', date: '2024-09-22' },
];

export const menuItems = [
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'sales', label: 'Ventas', icon: ShoppingCart },
    { id: 'settings', label: 'Configuración', icon: Settings },
];