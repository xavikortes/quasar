import { Logger } from "../domain/Logger.js";

export const ConsoleLogger = (): Logger => {
  return {
    info(message: string): void {
      // biome-ignore lint/suspicious/noConsoleLog: Its a logger
      console.log(`Info: ${message}`);
    },

    debug(message: unknown): void {
      // biome-ignore lint/suspicious/noConsoleLog: Its a logger
      console.log(message);
    },

    error(message: string | Error): void {
      console.error(`Error: ${message}`);
    },
  };
};
