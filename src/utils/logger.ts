import logger from "pino";
import dayjs from "dayjs";

// Create a logger instance to use
const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false, // remove process id from logs
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
