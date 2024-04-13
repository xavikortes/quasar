import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorStartOfLine = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorStartOfLine: Current Buffer not found");
    }

    const position = buffer.cursor.getPosition();
    position.x = 0;

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorStartOfLine = ReturnType<typeof MoveCursorStartOfLine>;
