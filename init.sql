-- USERS TABLE # password is 'hashedpassword123'
CREATE TABLE users (
   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   isAdmin BOOLEAN DEFAULT FALSE,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, isAdmin, createdAt, updatedAt) VALUES
   ('admin@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', TRUE, NOW(), NOW()),
   ('user1@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW()),
   ('user2@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW());

-- CLIENT TABLE
CREATE TABLE client (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    concessionId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FK CONSTRAINT FOR concessionId to be made

-- MOTORCYCLES TABLE
CREATE TABLE motorcycle (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vin VARCHAR(255) NOT NULL,
    modelId UUID NOT NULL,
    concessionId UUID NOT NULL,
    currentMileage INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO motorcycle (vin, modelId, concessionId, currentMileage, createdAt, updatedAt) VALUES
    ('1HGCM82633A123456', gen_random_uuid(), gen_random_uuid(), 12000, NOW(), NOW()),
    ('2HGCM82633A654321', gen_random_uuid(), gen_random_uuid(), 5000, NOW(), NOW()),
    ('3HGCM82633A789012', gen_random_uuid(), gen_random_uuid(), 8000, NOW(), NOW());

-- BRAND TABLE
CREATE TABLE brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO brand (name) VALUES
                             ('Yamaha'),
                             ('Honda'),
                             ('Suzuki'),
                             ('Kawasaki'),
                             ('Ducati'),
                             ('BMW'),
                             ('Harley-Davidson'),
                             ('Triumph'),
                             ('KTM'),
                             ('Aprilia');
-- MODEL TABLE
CREATE TABLE model (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    brand_id INT REFERENCES brand(id),
    description JSONB NOT NULL,
    maintenance_interval_km INT NOT NULL,
    maintenance_interval_months INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into the model table
INSERT INTO model (name, year, brand_id, description, maintenance_interval_km, maintenance_interval_months, created_at, updated_at) VALUES
    ('YZF-R1', 2023, (SELECT id FROM brand WHERE name = 'Yamaha'), 'changer les filtres', 10000, 12, NOW(), NOW()),
    ('CBR1000RR', 2023, (SELECT id FROM brand WHERE name = 'Honda'), 'vérifier les freins', 10000, 12, NOW(), NOW()),
    ('GSX-R1000', 2023, (SELECT id FROM brand WHERE name = 'Suzuki'), 'changer l huile', 10000, 12, NOW(), NOW()),
    ('Ninja ZX-10R', 2023, (SELECT id FROM brand WHERE name = 'Kawasaki'), 'vérifier la chaîne', 10000, 12, NOW(), NOW()),
    ('Panigale V4', 2023, (SELECT id FROM brand WHERE name = 'Ducati'), 'vérifier les pneus', 10000, 12, NOW(), NOW()),
    ('S1000RR', 2023, (SELECT id FROM brand WHERE name = 'BMW'), 'changer les bougies', 10000, 12, NOW(), NOW()),
    ('Street Glide', 2023, (SELECT id FROM brand WHERE name = 'Harley-Davidson'), 'vérifier la batterie', 10000, 12, NOW(), NOW()),
    ('Speed Triple 1200 RS', 2023, (SELECT id FROM brand WHERE name = 'Triumph'), 'vérifier les suspensions', 10000, 12, NOW(), NOW()),
    ('1290 Super Duke R', 2023, (SELECT id FROM brand WHERE name = 'KTM'), 'vérifier le système de refroidissement', 10000, 12, NOW(), NOW()),
    ('RSV4', 2023, (SELECT id FROM brand WHERE name = 'Aprilia'), 'vérifier l embrayage', 10000, 12, NOW(), NOW());

-- PART TABLE
CREATE TABLE part (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    reference VARCHAR(255) NOT NULL,
    stock INTEGER DEFAULT 0,
    minimumStock INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO part (name, reference, stock, minimumStock, createdAt, updatedAt) VALUES
    ('Brake Pad', 'BP123', 50, 10, NOW(), NOW()),
    ('Oil Filter', 'OF456', 30, 5, NOW(), NOW()),
    ('Spark Plug', 'SP789', 100, 20, NOW(), NOW());

-- MOTORCYCLE PART TABLE
CREATE TABLE motorcycle_part (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    motorcycleId UUID NOT NULL,
    partId UUID NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE motorcycle_part
    ADD CONSTRAINT fk_motorcycle_part_motorcycle FOREIGN KEY (motorcycleId) REFERENCES motorcycle(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_motorcycle_part_part FOREIGN KEY (partId) REFERENCES part(id) ON DELETE CASCADE;

INSERT INTO motorcycle_part (motorcycleId, partId, quantity, createdAt, updatedAt) VALUES
    ((SELECT id FROM motorcycle LIMIT 1), (SELECT id FROM part LIMIT 1), 2, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 1), (SELECT id FROM part LIMIT 1 OFFSET 1), 5, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 2), (SELECT id FROM part LIMIT 1 OFFSET 2), 1, NOW(), NOW());

-- MAINTENANCE SCHEDULES TABLE
CREATE TABLE maintenance_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    motorcycle_id UUID REFERENCES motorcycle(id),
    distance_interval INTEGER NOT NULL,
    time_interval INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MAINTENANCES TABLE
CREATE TABLE maintenances (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    motorcycle_id UUID REFERENCES motorcycle(id),
    schedule_id UUID REFERENCES maintenance_schedules(id),
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    mileage INTEGER NOT NULL,
    technicianNotes TEXT,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);