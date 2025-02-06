import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private client: Client;

    private constructor() {
        const databaseUrl = Deno.env.get("DATABASE_URL");

        if (!databaseUrl) {
            throw new Error("DATABASE_URL environment variable is not set");
        }

        this.client = new Client(databaseUrl);
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            console.log("Creating new database connection");
            DatabaseConnection.instance = new DatabaseConnection();

        }
        return DatabaseConnection.instance;
    }

    public async connect() {
        try {
            await this.client.connect();
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    }

    public async disconnect() {
        try {
            await this.client.end();
            console.log("Database connection closed");
        } catch (error) {
            console.error("Error closing database connection:", error);
        }
    }

    public getClient(): Client {
        return this.client;
    }
}