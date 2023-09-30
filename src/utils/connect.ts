import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

// function for DB connection
async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("🌎🛰 Database connected ✅ ");
  } catch (error) {
    logger.error("db error could not connect!", error);
    process.exit(1);
  }
}

export default connect;
