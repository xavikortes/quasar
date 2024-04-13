import { EventBus } from "../../../shared/domain/EventBus.js";
import { Buffer, BufferPrimitives } from "../domain/Buffer.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const CreateBuffer = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (request: BufferPrimitives): Promise<void> => {
    const buffer = Buffer.create(request);

    await repository.save(buffer);

    await eventBus.publish(buffer.pullDomainEvents());
  };
};

export type CreateBuffer = ReturnType<typeof CreateBuffer>;
