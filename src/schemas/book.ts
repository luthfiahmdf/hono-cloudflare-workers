import { z } from "@hono/zod-openapi";

export const booksSchema = z.object({
  id: z.string().uuid().openapi({ example: "book-uuid-9012" }),
  title: z
    .string()
    .min(1)
    .max(200)
    .openapi({ example: "Introduction to Programming" }),
  categoryId: z.string().uuid().openapi({ example: "cat-uuid-1234" }),
  bookSourceId: z.string().uuid().openapi({ example: "source-uuid-5678" }),
  createdAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
});

export const paramsBooksSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      description: "Book ID",
      example: "book-uuid-9012",
    }),
});
