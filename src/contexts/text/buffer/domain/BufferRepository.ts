import { BufferId } from "contexts/text/shared/domain/BufferId.js";
import { Buffer } from "./Buffer.js";

export interface BufferRepository {
  current: Buffer | null;

  find(bufferId: BufferId): Promise<Buffer | null>;
  findByPath(path: string): Promise<Buffer | null>;
  save(buffer: Buffer): Promise<void>;
  persist(buffer: Buffer): Promise<void>;
  all(): Promise<Buffer[]>;
  getCurrent(): Promise<Buffer | null>;
  setCurrent(buffer: Buffer): Promise<void>;
}
