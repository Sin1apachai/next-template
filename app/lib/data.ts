"use server"

import bcrypt from "bcrypt";
import pool from "./db";

export async function verifyUserLogin(
    username: string,
    password: string
): Promise<boolean> {
    const client = await pool.connect();

    try {
        const result = await client.query(
            "SELECT password FROM users WHERE name = $1 or email = $1",
            [username]
        );

        if (result.rows.length === 0) {
            console.error("User not found");
            return false;
        }

        const hashedPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            console.log("Password is correct");
            return true;
        } else {
            console.log("Password is incorrect");
            return false;
        }
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to verify user login.");
    } finally {
        client.release();
    }
}