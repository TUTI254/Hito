import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes/routes";

const port = config.get<number>("port");
const app = express();

// create server
app.listen(port, async () => {
  logger.info(`🚦Server running ✅ 🚀 on http://localhost:${port}`);
  await connect();
  routes(app);
});
