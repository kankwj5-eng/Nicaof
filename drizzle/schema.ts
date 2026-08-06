import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Stores table - Mini-tiendas de vendedores
 */
export const stores = mysqlTable("stores", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  logo: text("logo"),
  whatsapp: varchar("whatsapp", { length: 20 }),
  location: varchar("location", { length: 255 }),
  rating: int("rating").default(0).notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  likeCount: int("likeCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Store = typeof stores.$inferSelect;
export type InsertStore = typeof stores.$inferInsert;

/**
 * Products table - Productos de las tiendas
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("storeId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: int("price").notNull(),
  promotionalPrice: int("promotionalPrice"),
  images: text("images"),
  category: varchar("category", { length: 100 }).notNull(),
  condition: mysqlEnum("condition", ["new", "used"]).default("new").notNull(),
  specs: text("specs"),
  rating: int("rating").default(0).notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Reviews table - Reseñas de tiendas y productos
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("storeId"),
  productId: int("productId"),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Favorites table - Productos favoritos del usuario
 */
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * Likes table - Me gusta en tiendas
 */
export const likes = mysqlTable("likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

/**
 * ChatMessages table - Mensajes del chatbot
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  storeId: int("storeId"),
  productId: int("productId"),
  message: text("message").notNull(),
  sender: mysqlEnum("sender", ["user", "bot"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Promotions table - Promociones de tiendas
 */
export const promotions = mysqlTable("promotions", {
  id: int("id").autoincrement().primaryKey(),
  storeId: int("storeId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  discountPercent: int("discountPercent"),
  productIds: text("productIds"),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = typeof promotions.$inferInsert;

/**
 * UserRoles table - Extensión de roles (buyer/seller)
 */
export const userRoles = mysqlTable("userRoles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  userType: mysqlEnum("userType", ["buyer", "seller", "both"]).default("buyer").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserRole = typeof userRoles.$inferSelect;
export type InsertUserRole = typeof userRoles.$inferInsert;
