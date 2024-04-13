import { BufferId } from "contexts/text/shared/domain/BufferId.js";
import { Buffer } from "../domain/Buffer.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const InMemoryBufferRepository = (): BufferRepository => {
  const memory = new Map<string, Buffer>();
  let current: Buffer | null = null;

  return {
    current,

    async find(bufferId: BufferId): Promise<Buffer | null> {
      const buffer = memory.get(bufferId.value);

      if (!buffer) {
        return null;
      }

      return buffer;
    },

    async save(buffer: Buffer): Promise<void> {
      memory.set(buffer.id.value, buffer);
      this.setCurrent(buffer);
    },

    async persist(buffer: Buffer): Promise<void> {
      await this.save(buffer);
      await Bun.write(
        "/home/javier/borrame_qsa.config.json",
        buffer.content.value.join("\n")
      );
    },

    async all(): Promise<Buffer[]> {
      const buffers = Array.from(memory.values());

      return buffers;
    },

    async getCurrent(): Promise<Buffer | null> {
      return current;
    },

    async setCurrent(buffer: Buffer): Promise<void> {
      current = buffer;
    },
  };
};
