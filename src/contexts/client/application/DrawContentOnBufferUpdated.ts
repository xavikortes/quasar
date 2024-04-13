import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { ContentChangedEvent } from "contexts/text/buffer/domain/ContentChangedEvent.js";
import { CursorMovedEvent } from "contexts/text/buffer/domain/CursorMovedEvent.js";
import { DrawContent } from "./DrawContent.js";

type BufferUpdatedEvent = CursorMovedEvent | ContentChangedEvent;

export const DrawContentOnBufferUpdated = (
  contentDrawer: DrawContent
): DomainEventSubscriber<BufferUpdatedEvent> => {
  const name = "app.client.draw_content_on_buffer_updated";
  const events = [CursorMovedEvent, ContentChangedEvent];

  return {
    async on(_domainEvent: BufferUpdatedEvent) {
      await contentDrawer();
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
