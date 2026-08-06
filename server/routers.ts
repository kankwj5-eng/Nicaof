import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // STORES
  stores: router({
    getAll: publicProcedure.query(() => db.getAllStores()),
    getById: publicProcedure.input(z.number()).query(({ input }) => db.getStoreById(input)),
    getByUserId: publicProcedure.input(z.number()).query(({ input }) => db.getStoreByUserId(input)),
    create: protectedProcedure.input(z.object({
      name: z.string(),
      description: z.string().optional(),
      logo: z.string().optional(),
      whatsapp: z.string().optional(),
      location: z.string().optional(),
    })).mutation(({ ctx, input }) => db.createStore(ctx.user.id, input)),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      logo: z.string().optional(),
      whatsapp: z.string().optional(),
      location: z.string().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateStore(id, data);
    }),
  }),

  // PRODUCTS
  products: router({
    getById: publicProcedure.input(z.number()).query(({ input }) => db.getProductById(input)),
    getByStore: publicProcedure.input(z.number()).query(({ input }) => db.getProductsByStore(input)),
    search: publicProcedure.input(z.string()).query(({ input }) => db.searchProducts(input)),
    create: protectedProcedure.input(z.object({
      storeId: z.number(),
      name: z.string(),
      description: z.string().optional(),
      price: z.number(),
      promotionalPrice: z.number().optional(),
      images: z.string().optional(),
      category: z.string(),
      condition: z.enum(["new", "used"]),
      specs: z.string().optional(),
    })).mutation(({ input }) => db.createProduct(input.storeId, input)),
    update: protectedProcedure.input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      promotionalPrice: z.number().optional(),
      images: z.string().optional(),
      category: z.string().optional(),
      condition: z.enum(["new", "used"]).optional(),
      specs: z.string().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateProduct(id, data);
    }),
    delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteProduct(input)),
  }),

  // REVIEWS
  reviews: router({
    getStoreReviews: publicProcedure.input(z.number()).query(({ input }) => db.getStoreReviews(input)),
    getProductReviews: publicProcedure.input(z.number()).query(({ input }) => db.getProductReviews(input)),
    create: protectedProcedure.input(z.object({
      storeId: z.number().optional(),
      productId: z.number().optional(),
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
    })).mutation(({ ctx, input }) => db.createReview({
      ...input,
      userId: ctx.user.id,
    })),
  }),

  // FAVORITES
  favorites: router({
    add: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => db.addFavorite(ctx.user.id, input)),
    remove: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => db.removeFavorite(ctx.user.id, input)),
    getAll: protectedProcedure.query(({ ctx }) => db.getUserFavorites(ctx.user.id)),
    isFavorite: protectedProcedure.input(z.number()).query(({ ctx, input }) => db.isFavorite(ctx.user.id, input)),
  }),

  // LIKES
  likes: router({
    add: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => db.addLike(ctx.user.id, input)),
    remove: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => db.removeLike(ctx.user.id, input)),
    isLiked: protectedProcedure.input(z.number()).query(({ ctx, input }) => db.isLiked(ctx.user.id, input)),
  }),

  // CHAT
  chat: router({
    sendMessage: protectedProcedure.input(z.object({
      storeId: z.number().optional(),
      productId: z.number().optional(),
      message: z.string(),
    })).mutation(({ ctx, input }) => db.createChatMessage({
      userId: ctx.user.id,
      storeId: input.storeId,
      productId: input.productId,
      message: input.message,
      sender: "user",
    })),
    getHistory: protectedProcedure.query(({ ctx }) => db.getUserChatHistory(ctx.user.id)),
  }),

  // USER ROLES
  userRoles: router({
    getByUserId: publicProcedure.input(z.number()).query(({ input }) => db.getUserRoleByUserId(input)),
    create: protectedProcedure.input(z.enum(["buyer", "seller", "both"])).mutation(({ ctx, input }) => db.createUserRole(ctx.user.id, input)),
    update: protectedProcedure.input(z.enum(["buyer", "seller", "both"])).mutation(({ ctx, input }) => db.updateUserRole(ctx.user.id, input)),
  }),
});

export type AppRouter = typeof appRouter;
