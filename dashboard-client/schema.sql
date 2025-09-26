CREATE DATABASE IF NOT EXISTS dashboard_db;
USE dashboard_db;

-- -----------------------------------------------------
-- Tabla 1: Users (Usuarios)
-- Contiene la información de los usuarios y administradores.
-- -----------------------------------------------------
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Siempre guarda hashes, no contraseñas planas
    role ENUM('Cliente', 'Admin', 'Moderador') NOT NULL DEFAULT 'Cliente',
    status ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    joined_date DATE NOT NULL
);

-- -----------------------------------------------------
-- Tabla 2: Products (Productos)
-- Contiene el catálogo de ítems que pueden ser vendidos.
-- -----------------------------------------------------
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Tabla 3: Sales (Ventas/Pedidos)
-- Almacena las transacciones de ventas, relacionándolas con el usuario y el producto.
-- -----------------------------------------------------
CREATE TABLE Sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL, -- El monto real pagado (podría diferir del precio del producto)
    status ENUM('Completada', 'Pendiente', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    sale_date DATETIME NOT NULL,
    
    -- Claves foráneas para establecer las relaciones
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (customer_id) REFERENCES Users(id)
);

-- -----------------------------------------------------
-- Tabla 4: RecentActivity (Actividad Reciente / Log)
-- -----------------------------------------------------
CREATE TABLE RecentActivity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Puede ser NULL si es una acción del sistema
    action_type VARCHAR(50) NOT NULL, -- Ej: 'COMPRA', 'REGISTRO', 'ACTUALIZACION'
    description TEXT,
    amount DECIMAL(10, 2), -- Opcional, solo si la acción implica un monto (como una compra)
    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
