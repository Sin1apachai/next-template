import pool from "../lib/db";
import bcrypt from "bcrypt";
import { users } from "../lib/masterData";

async function seedUsers() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.query(
          `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING;
          `,
          [user.name, user.email, hashedPassword]
        );
      })
    );

    await client.query("COMMIT");
    console.log("Database seeded successfully");
    return insertedUsers;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function GET() {
  try {
    await seedUsers();
    return new Response(
      JSON.stringify({ message: "Database seeded successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}