import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { BufferCreatedEvent } from "contexts/text/buffer/domain/BufferCreatedEvent.js";
import { DrawContent } from "./DrawContent.js";

export const DrawContentOnBufferCreated = (
  contentDrawer: DrawContent
): DomainEventSubscriber<BufferCreatedEvent> => {
  const name = "app.client.draw_content_on_buffer_created";
  const events = [BufferCreatedEvent];

  return {
    async on(_domainEvent: BufferCreatedEvent) {
      await contentDrawer();
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
