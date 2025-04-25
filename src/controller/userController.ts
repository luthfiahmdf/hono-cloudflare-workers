import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "../type/type";
import { createUserRoute } from "../routes/userRoute";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";
import { hash } from "bcrypt";

const userController = new OpenAPIHono<Context>().openapi(
  createUserRoute,
  async (c) => {
    const db = drizzle(c.env.DB);
    const userData = c.req.valid("json");
    const saltRound = 10;
    const hashedPassword = await hash(userData.password, saltRound);
    const user = await db
      .insert(users)
      .values({
        ...userData,
        password: hashedPassword,
      })
      .returning();

    return c.json(user[0], 200);
  }
);

export { userController };
