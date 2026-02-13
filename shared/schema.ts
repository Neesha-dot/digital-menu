
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents or lowest currency unit
  isVeg: boolean("is_veg").default(false).notNull(),
  image: text("image").notNull(),
  spiceLevel: integer("spice_level").default(0), // 0-4
  
  // Recipe details
  foundation: text("foundation"),
  ingredients: jsonb("ingredients").$type<string[]>(), // Array of strings
  preparation: text("preparation"),
  chefSecret: text("chef_secret"),
  
  // Meta
  isFeatured: boolean("is_featured").default(false),
  nutritionalInfo: jsonb("nutritional_info").$type<{
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }>(),
  allergens: jsonb("allergens").$type<string[]>(),
});

export const insertCategorySchema = createInsertSchema(categories);
export const insertItemSchema = createInsertSchema(items);

export type Category = typeof categories.$inferSelect;
export type Item = typeof items.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertItem = z.infer<typeof insertItemSchema>;
