import { z } from "@hono/zod-openapi";
export const bookSourcesSchema = z.object({
  id: z.string().uuid().openapi({ example: "source-uuid-5678" }),
  name: z.string().min(1).max(100).openapi({ example: "Donated" }),
  createdAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
  updatedAt: z.string().datetime().openapi({ example: "2025-04-25T12:00:00Z" }),
});

export const paramsBookSourcesSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      description: "Book Source ID",
      example: "source-uuid-5678",
    }),
});
