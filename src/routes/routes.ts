import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";


// this is where we will add our routes
function routes(app: Express) {
  // this is just a test route to see if it works
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/v1/users", validateResource(createUserSchema), createUserHandler);
}

export default routes;
