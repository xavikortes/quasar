import { EventBus } from "contexts/shared/domain/EventBus.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const ReturnCursor = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const buffer = await repository.getCurrent();
    if (!buffer) {
      throw new Error("ReturnCursor: Current Buffer not found");
    }

    buffer.splitLine();

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type ReturnCursor = ReturnType<typeof ReturnCursor>;
