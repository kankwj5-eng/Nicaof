import { eq, and, desc, like, lte, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  stores, 
  products, 
  reviews, 
  favorites, 
  likes, 
  chatMessages, 
  promotions,
  userRoles,
  type Store,
  type Product,
  type Review,
  type Favorite,
  type Like,
  type ChatMessage,
  type Promotion,
  type UserRole,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ STORES ============

export async function createStore(userId: number, data: {
  name: string;
  description?: string;
  logo?: string;
  whatsapp?: string;
  location?: string;
}): Promise<Store | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(stores).values({
    userId,
    name: data.name,
    description: data.description,
    logo: data.logo,
    whatsapp: data.whatsapp,
    location: data.location,
  });

  const insertId = (result as any).insertId;
  return getStoreById(Number(insertId));
}

export async function getStoreById(id: number): Promise<Store | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(stores).where(eq(stores.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getStoreByUserId(userId: number): Promise<Store | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(stores).where(eq(stores.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllStores(limit: number = 50, offset: number = 0): Promise<Store[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(stores).limit(limit).offset(offset);
}

export async function updateStore(id: number, data: Partial<Store>): Promise<Store | null> {
  const db = await getDb();
  if (!db) return null;

  await db.update(stores).set(data).where(eq(stores.id, id));
  return getStoreById(id);
}

// ============ PRODUCTS ============

export async function createProduct(storeId: number, data: {
  name: string;
  description?: string;
  price: number;
  promotionalPrice?: number;
  images?: string;
  category: string;
  condition: "new" | "used";
  specs?: string;
}): Promise<Product | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(products).values({
    storeId,
    name: data.name,
    description: data.description,
    price: data.price,
    promotionalPrice: data.promotionalPrice,
    images: data.images,
    category: data.category,
    condition: data.condition,
    specs: data.specs,
  });

  const insertId = (result as any).insertId;
  return getProductById(Number(insertId));
}

export async function getProductById(id: number): Promise<Product | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProductsByStore(storeId: number, limit: number = 50): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(eq(products.storeId, storeId)).limit(limit);
}

export async function searchProducts(query: string, limit: number = 50): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(like(products.name, `%${query}%`)).limit(limit);
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
  const db = await getDb();
  if (!db) return null;

  await db.update(products).set(data).where(eq(products.id, id));
  return getProductById(id);
}

export async function deleteProduct(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  await db.delete(products).where(eq(products.id, id));
  return true;
}

// ============ REVIEWS ============

export async function createReview(data: {
  storeId?: number;
  productId?: number;
  userId: number;
  rating: number;
  comment?: string;
}): Promise<Review | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(reviews).values({
    storeId: data.storeId,
    productId: data.productId,
    userId: data.userId,
    rating: data.rating,
    comment: data.comment,
  });

  const insertId = (result as any).insertId;
  return getReviewById(Number(insertId));
}

export async function getReviewById(id: number): Promise<Review | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getStoreReviews(storeId: number, limit: number = 50): Promise<Review[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(eq(reviews.storeId, storeId)).limit(limit);
}

export async function getProductReviews(productId: number, limit: number = 50): Promise<Review[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(eq(reviews.productId, productId)).limit(limit);
}

// ============ FAVORITES ============

export async function addFavorite(userId: number, productId: number): Promise<Favorite | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(favorites).values({
    userId,
    productId,
  });

  const insertId = (result as any).insertId;
  return getFavoriteById(Number(insertId));
}

export async function getFavoriteById(id: number): Promise<Favorite | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(favorites).where(eq(favorites.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserFavorites(userId: number, limit: number = 50): Promise<Favorite[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(favorites).where(eq(favorites.userId, userId)).limit(limit);
}

export async function removeFavorite(userId: number, productId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));
  return true;
}

export async function isFavorite(userId: number, productId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(favorites).where(and(eq(favorites.userId, userId), eq(favorites.productId, productId))).limit(1);
  return result.length > 0;
}

// ============ LIKES ============

export async function addLike(userId: number, storeId: number): Promise<Like | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(likes).values({
    userId,
    storeId,
  });

  const insertId = (result as any).insertId;
  return getLikeById(Number(insertId));
}

export async function getLikeById(id: number): Promise<Like | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(likes).where(eq(likes.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function removeLike(userId: number, storeId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  await db.delete(likes).where(and(eq(likes.userId, userId), eq(likes.storeId, storeId)));
  return true;
}

export async function isLiked(userId: number, storeId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(likes).where(and(eq(likes.userId, userId), eq(likes.storeId, storeId))).limit(1);
  return result.length > 0;
}

// ============ CHAT MESSAGES ============

export async function createChatMessage(data: {
  userId: number;
  storeId?: number;
  productId?: number;
  message: string;
  sender: "user" | "bot";
}): Promise<ChatMessage | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(chatMessages).values({
    userId: data.userId,
    storeId: data.storeId,
    productId: data.productId,
    message: data.message,
    sender: data.sender,
  });

  const insertId = (result as any).insertId;
  return getChatMessageById(Number(insertId));
}

export async function getChatMessageById(id: number): Promise<ChatMessage | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(chatMessages).where(eq(chatMessages.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserChatHistory(userId: number, limit: number = 50): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(chatMessages).where(eq(chatMessages.userId, userId)).orderBy(desc(chatMessages.createdAt)).limit(limit);
}

// ============ PROMOTIONS ============

export async function createPromotion(storeId: number, data: {
  title: string;
  description?: string;
  discountPercent?: number;
  productIds?: string;
  startDate: Date;
  endDate: Date;
}): Promise<Promotion | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(promotions).values({
    storeId,
    title: data.title,
    description: data.description,
    discountPercent: data.discountPercent,
    productIds: data.productIds,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  const insertId = (result as any).insertId;
  return getPromotionById(Number(insertId));
}

export async function getPromotionById(id: number): Promise<Promotion | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(promotions).where(eq(promotions.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getStorePromotions(storeId: number): Promise<Promotion[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(promotions).where(eq(promotions.storeId, storeId));
}

export async function getActivePromotions(): Promise<Promotion[]> {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  return db.select().from(promotions).where(and(lte(promotions.startDate, now), gte(promotions.endDate, now)));
}

// ============ USER ROLES ============

export async function createUserRole(userId: number, userType: "buyer" | "seller" | "both"): Promise<UserRole | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(userRoles).values({
    userId,
    userType,
  });

  const insertId = (result as any).insertId;
  return getUserRoleById(Number(insertId));
}

export async function getUserRoleById(id: number): Promise<UserRole | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userRoles).where(eq(userRoles.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserRoleByUserId(userId: number): Promise<UserRole | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userRoles).where(eq(userRoles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateUserRole(userId: number, userType: "buyer" | "seller" | "both"): Promise<UserRole | null> {
  const db = await getDb();
  if (!db) return null;

  const existing = await getUserRoleByUserId(userId);
  if (existing) {
    await db.update(userRoles).set({ userType }).where(eq(userRoles.userId, userId));
    return getUserRoleByUserId(userId);
  } else {
    return createUserRole(userId, userType);
  }
}
