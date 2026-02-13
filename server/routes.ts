
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.items.list.path, async (req, res) => {
    const filters = {
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
      isVeg: req.query.isVeg === 'true' ? true : req.query.isVeg === 'false' ? false : undefined,
      search: req.query.search as string | undefined,
      featured: req.query.featured === 'true' ? true : undefined,
    };
    const items = await storage.getItems(filters);
    res.json(items);
  });

  app.get(api.items.get.path, async (req, res) => {
    const item = await storage.getItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  });

  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCategories = await storage.getCategories();
  if (existingCategories.length === 0) {
    const bombRolls = await storage.createCategory({
      name: "Bomb Rolls",
      slug: "bomb-rolls",
      description: "Signature rolls bursting with flavor",
    });
    const bombBowls = await storage.createCategory({
      name: "Bomb Bowls",
      slug: "bomb-bowls",
      description: "Hearty bowls for a full meal",
    });

    // Seed Items
    await storage.createItem({
      categoryId: bombRolls.id,
      name: "Classic Paneer Tikka Roll",
      description: "Smoky paneer cubes wrapped in a soft paratha with mint chutney and onions.",
      price: 150,
      isVeg: true,
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=800&q=80",
      spiceLevel: 2,
      foundation: "Whole wheat paratha",
      ingredients: ["Paneer", "Onions", "Capsicum", "Mint Chutney"],
      preparation: "Grilled to perfection",
      isFeatured: true,
    });

    await storage.createItem({
      categoryId: bombRolls.id,
      name: "Fiery Chicken Schezwan Roll",
      description: "Spicy chicken tossed in schezwan sauce, wrapped with crunchy veggies.",
      price: 180,
      isVeg: false,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
      spiceLevel: 4,
      foundation: "Flaky paratha",
      ingredients: ["Chicken", "Schezwan Sauce", "Cabbage", "Carrot"],
      preparation: "Wok-tossed filling",
      isFeatured: true,
    });
    
    await storage.createItem({
      categoryId: bombBowls.id,
      name: "Butter Chicken Rice Bowl",
      description: "Creamy butter chicken served over aromatic basmati rice.",
      price: 250,
      isVeg: false,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
      spiceLevel: 1,
      foundation: "Basmati Rice",
      ingredients: ["Chicken", "Butter", "Cream", "Tomato Gravy"],
      preparation: "Slow cooked gravy",
      isFeatured: false,
    });

     await storage.createItem({
      categoryId: bombBowls.id,
      name: "Veggie Delight Bowl",
      description: "Mixed vegetable curry served with cumin rice.",
      price: 200,
      isVeg: true,
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80",
      spiceLevel: 2,
      foundation: "Jeera Rice",
      ingredients: ["Carrots", "Peas", "Beans", "Cauliflower"],
      preparation: "Homestyle curry",
      isFeatured: false,
    });
  }
}
