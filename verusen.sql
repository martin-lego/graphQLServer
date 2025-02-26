CREATE DATABASE verusen;

\c verusen;

CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    long_description TEXT,
    customer_part_id VARCHAR(255),
    category VARCHAR(100),
    manufacturer_id INT REFERENCES manufacturers(id)
);

CREATE TABLE competitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    part_name VARCHAR(255),
    part_id VARCHAR(255)
);

CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    material_id INT REFERENCES materials(id) ON DELETE CASCADE,
    requested_unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    material_id INT REFERENCES materials(id) ON DELETE CASCADE,
    unit_of_measure VARCHAR(50),
    unit_quantity INT,
    requested_quantity INT
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_materials_category ON materials(category);
CREATE INDEX idx_prices_material_id ON prices(material_id);
CREATE INDEX idx_units_material_id ON units(material_id);
