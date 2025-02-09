-- USERS TABLE # password is 'hashedpassword123'
INSERT INTO users (email, password, isAdmin, createdAt, updatedAt) VALUES
    ('admin@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', TRUE, NOW(), NOW()),
    ('user1@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW()),
    ('user2@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW());

-- Insert records into the concession table
INSERT INTO concession (id, name, address, siret, phoneNumber, createdAt, updatedAt) VALUES
    (gen_random_uuid(), 'Concession A', 'Address A', '123456789', '0123456789', NOW(), NOW()),
    (gen_random_uuid(), 'Concession B', 'Address B', '987654321', '0987654321', NOW(), NOW()),
    (gen_random_uuid(), 'Concession C', 'Address C', '123123123', '1231231234', NOW(), NOW());

-- Insert records into the client table using the IDs from the concession table
INSERT INTO client (firstName, lastName, phone, concessionId, createdAt, updatedAt) VALUES
    ('John', 'Doe', '0623456789', (SELECT id FROM concession LIMIT 1 OFFSET 0), NOW(), NOW()),
    ('Jane', 'Smith', '0787654321', (SELECT id FROM concession LIMIT 1 OFFSET 1), NOW(), NOW()),
    ('Alice', 'Johnson', '0634567890', (SELECT id FROM concession LIMIT 1 OFFSET 2), NOW(), NOW());

INSERT INTO motorcycle (vin, modelId, concessionId, currentMileage, createdAt, updatedAt) VALUES
    ('1HGCM82633A123456', gen_random_uuid(), gen_random_uuid(), 12000, NOW(), NOW()),
    ('2HGCM82633A654321', gen_random_uuid(), gen_random_uuid(), 5000, NOW(), NOW()),
    ('3HGCM82633A789012', gen_random_uuid(), gen_random_uuid(), 8000, NOW(), NOW());


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

INSERT INTO part (name, reference, stock, minimumStock, createdAt, updatedAt) VALUES
    ('Brake Pad', 'BP123', 50, 10, NOW(), NOW()),
    ('Oil Filter', 'OF456', 30, 5, NOW(), NOW()),
    ('Spark Plug', 'SP789', 100, 20, NOW(), NOW());

INSERT INTO motorcycle_part (motorcycleId, partId, quantity, createdAt, updatedAt) VALUES
    ((SELECT id FROM motorcycle LIMIT 1), (SELECT id FROM part LIMIT 1), 2, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 1), (SELECT id FROM part LIMIT 1 OFFSET 1), 5, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 2), (SELECT id FROM part LIMIT 1 OFFSET 2), 1, NOW(), NOW());