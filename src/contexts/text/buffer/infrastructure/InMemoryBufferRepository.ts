import { BufferId } from "contexts/text/shared/domain/BufferId.js";
import { Buffer } from "../domain/Buffer.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const InMemoryBufferRepository = (): BufferRepository => {
  const memory: Buffer[] = [];

  return {
    async find(bufferId: BufferId): Promise<Buffer | null> {
      const buffer = memory.find(
        (buffer) => buffer.id.value === bufferId.value
      );

      return buffer ?? null;
    },

    async findByPath(path: string): Promise<Buffer | null> {
      const buffer = memory.find((buffer) => buffer.path === path);

      return buffer ?? null;
    },

    async save(savedBuffer: Buffer): Promise<void> {
      const bufferIndex = memory.findIndex(
        (buffer) => buffer.id.value === savedBuffer.id.value
      );
      if (bufferIndex !== -1) {
        memory.splice(bufferIndex, 1);
      }

      memory.unshift(savedBuffer);
    },

    async persist(buffer: Buffer): Promise<void> {
      await this.save(buffer);
      await Bun.write(buffer.path, buffer.content.value.join("\n"));
    },

    async all(): Promise<Buffer[]> {
      const buffers = Array.from(memory.values());

      return buffers;
    },

    async getCurrent(): Promise<Buffer | null> {
      return memory[0];
    },
  };
};
