import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorRight = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorRight: Current Buffer not found");
    }

    if (buffer.atEndOfFile()) return false;

    const position = buffer.cursor.getPosition();

    if (buffer.atEndOfLine()) {
      position.y = position.y + 1;
      position.x = 0;
    } else {
      position.x = position.x + 1;
    }

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorRight = ReturnType<typeof MoveCursorRight>;
