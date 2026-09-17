CREATE DATABASE IF NOT EXISTS employee_management;

USE employee_management;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE')
        NOT NULL DEFAULT 'EMPLOYEE',
    reset_token VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Demo users should be created through the registration API so passwords
-- are hashed with bcrypt. Do not insert plain-text passwords here.

-- Roles:
-- ADMIN
-- PROJECT_MANAGER
-- EMPLOYEE