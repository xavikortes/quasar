import { EventBus } from "../../../shared/domain/EventBus.js";
import { Buffer } from "../domain/Buffer.js";
import { BufferCursor } from "../domain/BufferCursor.js";
import { BufferRepository } from "../domain/BufferRepository.js";

export const OpenBufferFromFile = (
  repository: BufferRepository,
  eventBus: EventBus
) => {
  return async (): Promise<boolean> => {
    const f = Bun.file("/home/javier/borrame_qsa.config.json");
    const content = await f.text();

    const buffer = Buffer.create({
      id: "borr_qsa_conf",
      name: "borrame_qsa.config.json",
      content: content.split("\n"),
      cursor: BufferCursor.init(),
    });

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type OpenBufferFromFile = ReturnType<typeof OpenBufferFromFile>;
