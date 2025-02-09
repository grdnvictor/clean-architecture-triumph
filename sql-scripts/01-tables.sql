CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE client (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    concessionId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE concession (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    siret VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motorcycle (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vin VARCHAR(255) NOT NULL,
    modelId UUID NOT NULL,
    concessionId UUID NOT NULL,
    currentMileage INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

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

CREATE TABLE part (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    reference VARCHAR(255) NOT NULL,
    stock INTEGER DEFAULT 0,
    minimumStock INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motorcycle_part (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    motorcycleId UUID NOT NULL,
    partId UUID NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    motorcycle_id UUID REFERENCES motorcycle(id),
    distance_interval INTEGER NOT NULL,
    time_interval INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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