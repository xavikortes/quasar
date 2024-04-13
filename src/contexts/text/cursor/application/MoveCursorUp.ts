import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorUp = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorUp: Current Buffer not found");
    }

    if (buffer.atFirstLine()) return false;

    const position = buffer.cursor.getPosition();
    position.y = position.y - 1;

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorUp = ReturnType<typeof MoveCursorUp>;
