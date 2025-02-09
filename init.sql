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
CREATE TABLE concession (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    siret VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE client
    ADD CONSTRAINT fk_client_concession FOREIGN KEY (concessionId) REFERENCES concession(id) ON DELETE CASCADE;


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

INSERT INTO motorcycle_part (motorcycleId, partId, quantity, createdAt, updatedAt)
VALUES
    ((SELECT id FROM motorcycle LIMIT 1), (SELECT id FROM part LIMIT 1), 2, NOW(), NOW()),
((SELECT id FROM motorcycle LIMIT 1 OFFSET 1), (SELECT id FROM part LIMIT 1 OFFSET 1), 5, NOW(), NOW()),
((SELECT id FROM motorcycle LIMIT 1 OFFSET 2), (SELECT id FROM part LIMIT 1 OFFSET 2), 1, NOW(), NOW());
