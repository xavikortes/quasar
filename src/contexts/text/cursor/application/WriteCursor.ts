import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const WriteCursor = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (char: string): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("WriteCursor: Current Buffer not found");
    }

    buffer.writeCharacter(char);

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type WriteCursor = ReturnType<typeof WriteCursor>;
