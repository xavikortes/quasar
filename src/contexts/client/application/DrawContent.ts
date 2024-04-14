import {
  Buffer,
  BufferPrimitives,
} from "contexts/text/buffer/domain/Buffer.js";
import { ClientRepository } from "../domain/ClientRepository.js";
import { ClientMessageRepository } from "../infrastructure/ClientMessageRepository.js";

export const DrawContent = (
  repository: ClientRepository,
  messageRepository: ClientMessageRepository
) => {
  return async (bufferPrimitives: BufferPrimitives) => {
    const buffer = Buffer.fromPrimitives(bufferPrimitives);

    const name = buffer.showName();
    const content = buffer.content.value;
    const position = buffer.cursor.getPosition();
    const offset = buffer.cursor.getOffset();
    const message = messageRepository.getMessage();

    await repository.draw(name, content, position, offset, message);

    messageRepository.clear();
  };
};

export type DrawContent = ReturnType<typeof DrawContent>;
