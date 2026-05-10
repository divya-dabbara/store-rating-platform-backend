import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the database connection
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected Successfully');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error.message);
    // We don't exit process here so the server can still start even if DB is not ready,
    // but you can choose to process.exit(1) if DB is strictly required.
  }
};

export default pool;
