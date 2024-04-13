import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorEndOfFile = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorEndOfFile: Current Buffer not found");
    }

    const position = buffer.cursor.getPosition();
    position.y = buffer.length() - 1;
    position.x = buffer.lineLenght(position.y);

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorEndOfFile = ReturnType<typeof MoveCursorEndOfFile>;
