import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { loginResponseSchema, loginSchema } from "../schemas/user";
import { errorSchema } from "../schemas/globalSchema";

const userLoginRoute = createRoute({
  method: "post",
  path: "",
  request: {
    body: jsonContentRequired(loginSchema, "Login user"),
  },
  responses: {
    200: jsonContent(loginResponseSchema, "User logged in"),
    401: jsonContent(errorSchema, "Unauthorized"),
  },
});
export { userLoginRoute };
