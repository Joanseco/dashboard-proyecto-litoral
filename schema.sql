CREATE DATABASE IF NOT EXISTS dashboard_db;
USE dashboard_db;


CREATE DATABASE IF NOT EXISTS dashboard_db;
USE dashboard_db;

-- Tabla 1: Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Cliente', 'Admin', 'Moderador') NOT NULL DEFAULT 'Cliente',
    status ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    joined_date DATE NOT NULL
);

-- Tabla 2: Products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla 3: Sales
CREATE TABLE Sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Completada', 'Pendiente', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    sale_date DATETIME NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (customer_id) REFERENCES Users(id)
);

-- Tabla 4: RecentActivity
CREATE TABLE RecentActivity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type VARCHAR(50) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2),
    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


select * from users;
Select * from products;
select * from sales;
select * from recentactivity;