import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const MoveCursorDown = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("MoveCursorDown: Current Buffer not found");
    }

    if (buffer.atLastLine()) return false;

    const position = buffer.cursor.getPosition();
    position.y = position.y + 1;

    buffer.moveCursorTo(position);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type MoveCursorDown = ReturnType<typeof MoveCursorDown>;
