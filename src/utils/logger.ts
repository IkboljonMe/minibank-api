import pino from "pino";
import pretty from "pino-pretty";
const stream = pretty({
  colorize: true,
  translateTime: "SYS:HH:MM:ss",
});
const logger = pino(stream);
export default logger;
