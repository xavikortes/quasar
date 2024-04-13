export interface Logger {
  debug(message: unknown): void;
  error(message: string | Error): void;
  info(message: string): void;
}
