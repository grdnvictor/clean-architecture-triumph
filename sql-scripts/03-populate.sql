-- USERS TABLE # password is 'hashedpassword123'
INSERT INTO users (email, password, isAdmin, createdAt, updatedAt) VALUES
    ('admin@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', TRUE, NOW(), NOW()),
    ('user1@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW()),
    ('user2@example.com', '$2y$10$/WEZLm0N0cNWYVs.LF7j8.3zR.5H7OBlObf7d1FmbTLhS.txKRxDC', FALSE, NOW(), NOW());

INSERT INTO concession (id, name, address, siret, phoneNumber, createdAt, updatedAt) VALUES
    (gen_random_uuid(), 'Concession A', 'Address A', '123456789', '0123456789', NOW(), NOW()),
    (gen_random_uuid(), 'Concession B', 'Address B', '987654321', '0987654321', NOW(), NOW()),
    (gen_random_uuid(), 'Concession C', 'Address C', '123123123', '1231231234', NOW(), NOW());

INSERT INTO client (firstName, lastName, phone, concessionId, createdAt, updatedAt) VALUES
    ('John', 'Doe', '0623456789', (SELECT id FROM concession LIMIT 1 OFFSET 0), NOW(), NOW()),
    ('Jane', 'Smith', '0787654321', (SELECT id FROM concession LIMIT 1 OFFSET 1), NOW(), NOW()),
    ('Alice', 'Johnson', '0634567890', (SELECT id FROM concession LIMIT 1 OFFSET 2), NOW(), NOW());

INSERT INTO motorcycle (vin, modelId, concessionId, currentMileage, createdAt, updatedAt) VALUES
    ('1HGCM82633A123456', gen_random_uuid(), gen_random_uuid(), 12000, NOW(), NOW()),
    ('2HGCM82633A654321', gen_random_uuid(), gen_random_uuid(), 5000, NOW(), NOW()),
    ('3HGCM82633A789012', gen_random_uuid(), gen_random_uuid(), 8000, NOW(), NOW());

INSERT INTO client_motorcycle (id, vin, model_id, client_id, currentMileage, createdAt, updatedAt) VALUES
    (gen_random_uuid(), '1HGCM82633A004352', (SELECT id FROM model LIMIT 1 OFFSET 0), (SELECT id FROM client LIMIT 1 OFFSET 0), 10000, NOW(), NOW()),
    (gen_random_uuid(), '2HGCM82633A004353', (SELECT id FROM model LIMIT 1 OFFSET 1), (SELECT id FROM client LIMIT 1 OFFSET 1), 15000, NOW(), NOW()),
    (gen_random_uuid(), '3HGCM82633A004354', (SELECT id FROM model LIMIT 1 OFFSET 2), (SELECT id FROM client LIMIT 1 OFFSET 2), 20000, NOW(), NOW());

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


INSERT INTO model (id, name, year, brand_id, description, maintenance_interval_km, maintenance_interval_months, created_at, updated_at) VALUES
(gen_random_uuid(), 'YZF-R1', 2023, (SELECT id FROM brand WHERE name = 'Yamaha'), '{"maintenance": "changer les filtres"}', 10000, 12, NOW(), NOW()),
(gen_random_uuid(), 'CBR1000RR', 2023, (SELECT id FROM brand WHERE name = 'Honda'), '{"maintenance": "vérifier les freins"}', 10000, 12, NOW(), NOW()),
(gen_random_uuid(), 'GSX-R1000', 2023, (SELECT id FROM brand WHERE name = 'Suzuki'), '{"maintenance": "changer l huile"}', 10000, 12, NOW(), NOW());

INSERT INTO part (name, reference, stock, minimumStock, createdAt, updatedAt) VALUES
    ('Brake Pad', 'BP123', 50, 10, NOW(), NOW()),
    ('Oil Filter', 'OF456', 30, 5, NOW(), NOW()),
    ('Spark Plug', 'SP789', 100, 20, NOW(), NOW());

INSERT INTO motorcycle_part (motorcycleId, partId, quantity, createdAt, updatedAt) VALUES
    ((SELECT id FROM motorcycle LIMIT 1), (SELECT id FROM part LIMIT 1), 2, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 1), (SELECT id FROM part LIMIT 1 OFFSET 1), 5, NOW(), NOW()),
    ((SELECT id FROM motorcycle LIMIT 1 OFFSET 2), (SELECT id FROM part LIMIT 1 OFFSET 2), 1, NOW(), NOW());