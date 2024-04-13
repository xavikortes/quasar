import { BufferId } from "contexts/text/shared/domain/BufferId.js";
import { Buffer } from "../domain/Buffer.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const FindBuffer = (repository: BufferRepository) => {
  return async (id: string): Promise<Buffer> => {
    const bufferId = new BufferId(id);
    const buffer = await repository.find(bufferId);

    if (!buffer) {
      throw new Error(`FindBuffer: Buffer with id ${id} not found`);
    }

    return buffer;
  };
};

export type FindBuffer = ReturnType<typeof FindBuffer>;
