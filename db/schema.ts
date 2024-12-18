import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const res_users = pgTable('res_users', {
    id: serial('id').primaryKey(),

    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 256 }).notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
