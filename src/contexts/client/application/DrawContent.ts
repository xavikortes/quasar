import { BufferRepository } from "contexts/text/buffer/domain/BufferRepository.js";
import { ClientRepository } from "../domain/ClientRepository.js";

export const DrawContent = (
  repository: ClientRepository,
  bufferRepository: BufferRepository
) => {
  return async () => {
    const buffer = await bufferRepository.getCurrent();

    if (!buffer) return;

    const content = buffer.content.value;
    const position = buffer.cursor.getPosition();

    await repository.draw(content, position);
  };
};

export type DrawContent = ReturnType<typeof DrawContent>;
