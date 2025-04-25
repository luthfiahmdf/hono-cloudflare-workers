import { OpenAPIHono } from "@hono/zod-openapi";
import { userController } from "../controller/userController";
import { userLoginController } from "../controller/authController";
import { bookController } from "../controller/bookController";

const routes = new OpenAPIHono()
  .basePath("/api")
  .route("/users", userController)
  .route("/auth", userLoginController)
  .route("/books", bookController)
  .doc("/doc", {
    openapi: "3.0.3",
    info: {
      version: "1.0.0",
      title: "Pathatu API",
    },
  });
export type AppType = typeof routes;
export default routes;
export type App = typeof routes;
