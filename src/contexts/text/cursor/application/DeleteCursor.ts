import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const DeleteCursor = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("DeleteCursor: Current Buffer not found");
    }

    if (buffer.atEndOfFile()) return false;

    if (buffer.atEndOfLine()) {
      buffer.joinNextLine();
    } else {
      buffer.deleteCharacter();
    }

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type DeleteCursor = ReturnType<typeof DeleteCursor>;
