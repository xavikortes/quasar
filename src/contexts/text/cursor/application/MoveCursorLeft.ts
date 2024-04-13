import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorLeft = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorLeft: Current Buffer not found");
    }

    if (buffer.atBeginningOfFile()) return false;

    const position = buffer.cursor.getPosition();

    if (buffer.atBeginningOfLine()) {
      position.y = position.y - 1;
      position.x = buffer.lineLenght(position.y);
    } else {
      position.x = position.x - 1;
    }

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorLeft = ReturnType<typeof MoveCursorLeft>;
