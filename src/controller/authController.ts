import { OpenAPIHono } from "@hono/zod-openapi";
import { Context } from "../types/type";
import { userLoginRoute } from "../routes/authRoute";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { HTTPException } from "hono/http-exception";

const userLoginController = new OpenAPIHono<Context>().openapi(
  userLoginRoute,
  async (c) => {
    const db = drizzle(c.env.DB);
    const userData = c.req.valid("json");

    const userExist = await db
      .select()
      .from(users)
      .where(eq(users.userName, userData.userName));
    const user = userExist[0];

    if (!user) {
      throw new HTTPException(401, { message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordMatch) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    const token = await sign(
      {
        id: user.id,
        userName: user.userName,
      },
      c.env.JWT_SECRET
    );
    return c.json({
      token: token,
      message: "User logged in",
    });
  }
);

export { userLoginController };
