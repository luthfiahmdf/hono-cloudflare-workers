import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "../types/type";
import { createUserRoute } from "../routes/userRoute";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

const userController = new OpenAPIHono<Context>().openapi(
  createUserRoute,
  async (c) => {
    const db = drizzle(c.env.DB);
    const userData = c.req.valid("json");
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRound);
    const userExist = await db
      .select()
      .from(users)
      .where(eq(users.userName, userData.userName));

    if (userExist.length > 0) {
      throw new HTTPException(400, { message: "User already exist" });
    }
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
