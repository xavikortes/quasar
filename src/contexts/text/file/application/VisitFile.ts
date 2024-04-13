import { EventBus } from "../../../shared/domain/EventBus.js";
import { Buffer } from "../../buffer/domain/Buffer.js";
import { BufferCursor } from "../../buffer/domain/BufferCursor.js";
import { BufferRepository } from "../../buffer/domain/BufferRepository.js";

export const VisitFile = (repository: BufferRepository, eventBus: EventBus) => {
  return async (id: string, path: string): Promise<boolean> => {
    const f = Bun.file(path);
    const content = await f.text();

    const prevBuffer = await repository.findByPath(path);
    if (prevBuffer) {
      await repository.setCurrent(prevBuffer);
      return true;
    }

    const buffer = Buffer.create({
      id: id,
      name: path.split("/").pop() ?? "Untitled",
      content: content.split("\n"),
      cursor: BufferCursor.init(),
      readonly: false,
      path: path,
      isModified: false,
    });

    await repository.save(buffer);
    await eventBus.publish(buffer.pullDomainEvents());

    return true;
  };
};

export type VisitFile = ReturnType<typeof VisitFile>;
