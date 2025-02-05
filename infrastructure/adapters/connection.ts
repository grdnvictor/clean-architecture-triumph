import pg from "pg";

const { Pool } = pg;
export const pool = new Pool({
    user: "clean_user",
    host: "localhost",
    database: "clean_db",
    password: "clean_password",
    port: 5432,
});
async function connectToDatabase() {
    try {
        await pool.connect();
    } catch (e) {
        console.error("Connection error:", e.message);
    }
}

(async () => {
    await connectToDatabase();
})();