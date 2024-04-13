import {
  Buffer,
  BufferPrimitives,
} from "contexts/text/buffer/domain/Buffer.js";
import { ClientRepository } from "../domain/ClientRepository.js";

export const DrawContent = (repository: ClientRepository) => {
  return async (bufferPrimitives: BufferPrimitives) => {
    const buffer = Buffer.fromPrimitives(bufferPrimitives);

    const name = buffer.showName();
    const content = buffer.content.value;
    const position = buffer.cursor.getPosition();

    await repository.draw(name, content, position);
  };
};

export type DrawContent = ReturnType<typeof DrawContent>;
