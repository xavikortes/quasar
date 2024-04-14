import { appendFile } from "node:fs/promises";
import { Logger } from "../domain/Logger.js";

export const FileLogger = (): Logger => {
  return {
    info(message: string): void {
      appendFile("/home/javier/.quasar/logs/info.log", `\n${message}`);
    },

    debug(message: unknown): void {
      appendFile(
        "/home/javier/.quasar/logs/debug.log",
        `\n${(message as string).toString()}`
      );
    },

    error(message: string | Error): void {
      appendFile(
        "/home/javier/.quasar/logs/error.log",
        `\n${(message as string).toString()}`
      );
    },
  };
};
