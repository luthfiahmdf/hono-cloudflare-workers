import { z } from "@hono/zod-openapi";
export const categoriesSchema = z.object({
  id: z.string().uuid().openapi({ example: "cat-uuid-1234" }),
  name: z.string().min(1).max(100).openapi({ example: "Fiction" }),
  createdAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
});

export const paramsCategoriesSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      description: "Category ID",
      example: "cat-uuid-1234",
    }),
});
