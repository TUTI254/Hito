import { Express, Request, Response } from "express";

// this is where we will add our routes
function routes(app: Express) {
  // this is just a test route to see if it works
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default routes;
