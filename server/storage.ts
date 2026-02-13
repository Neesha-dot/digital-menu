
import { db } from "./db";
import {
  items,
  categories,
  type Item,
  type InsertItem,
  type Category,
  type InsertCategory
} from "@shared/schema";
import { eq, ilike, and } from "drizzle-orm";

export interface IStorage {
  getItems(filters?: { categoryId?: number; isVeg?: boolean; search?: string; featured?: boolean }): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  getCategories(): Promise<Category[]>;
  createItem(item: InsertItem): Promise<Item>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class DatabaseStorage implements IStorage {
  async getItems(filters?: { categoryId?: number; isVeg?: boolean; search?: string; featured?: boolean }): Promise<Item[]> {
    const conditions = [];
    if (filters?.categoryId) conditions.push(eq(items.categoryId, filters.categoryId));
    if (filters?.isVeg !== undefined) conditions.push(eq(items.isVeg, filters.isVeg));
    if (filters?.featured !== undefined) conditions.push(eq(items.isFeatured, filters.featured));
    if (filters?.search) conditions.push(ilike(items.name, `%${filters.search}%`));

    return await db.select().from(items).where(and(...conditions));
  }

  async getItem(id: number): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [item] = await db.insert(items).values(insertItem).returning();
    return item;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
}

export const storage = new DatabaseStorage();
