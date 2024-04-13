import { EventBus } from "../../../shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const PersistBuffer = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) return false;

    if (buffer.readonly) return false;
    if (!buffer.path) return false;
    if (!buffer.isModified) return true;

    buffer.persist();

    await repository.persist(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type PersistBuffer = ReturnType<typeof PersistBuffer>;
