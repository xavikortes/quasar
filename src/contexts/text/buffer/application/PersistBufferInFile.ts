import { EventBus } from "../../../shared/domain/EventBus.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const PersistBufferInFile = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) return false;

    await repository.persist(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type PersistBufferInFile = ReturnType<typeof PersistBufferInFile>;
