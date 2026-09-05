import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const enquiries = sqliteTable("enquiries", { id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), email: text("email").notNull(), phone: text("phone").notNull(), service: text("service").notNull(), suburb: text("suburb").notNull().default(""), message: text("message").notNull(), status: text("status").notNull().default("new"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`) });
