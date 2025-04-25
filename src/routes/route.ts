import { OpenAPIHono } from "@hono/zod-openapi";
import { userController } from "../controller/userController";
import { userLoginController } from "../controller/authController";

const routes = new OpenAPIHono()
  .basePath("/api")
  .route("/users", userController)
  .route("/auth", userLoginController)
  .doc("/doc", {
    openapi: "3.0.3",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  });
export type AppType = typeof routes;
export default routes;
export type App = typeof routes;
