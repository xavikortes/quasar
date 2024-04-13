import { BufferPrimitives } from "../domain/Buffer.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const SearchAllBuffers = (repository: BufferRepository) => {
  return async (): Promise<BufferPrimitives[]> => {
    const buffers = await repository.all();

    return buffers.map((buffer) => buffer.toPrimitives());
  };
};

export type SearchAllBuffers = ReturnType<typeof SearchAllBuffers>;
