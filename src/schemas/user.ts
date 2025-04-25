import { z } from "@hono/zod-openapi";

// Users
export const usersSchema = z.object({
  id: z.string().uuid().openapi({
    example: "123e4567-e89b-12d3-a456-426614174000",
  }),
  userName: z.string().min(3).max(50).openapi({
    example: "johndoe",
  }),
  password: z.string().min(6).openapi({
    example: "securePassword123",
  }),
});
export const paramsUsersSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      description: "User ID",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
});
