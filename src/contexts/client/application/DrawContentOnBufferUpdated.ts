import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { BufferCreatedEvent } from "contexts/text/buffer/domain/BufferCreatedEvent.js";
import { ContentChangedEvent } from "contexts/text/buffer/domain/ContentChangedEvent.js";
import { CursorMovedEvent } from "contexts/text/buffer/domain/CursorMovedEvent.js";
import { AppResizedEvent } from "../domain/AppResizedEvent.js";
import { DrawContent } from "./DrawContent.js";

type BufferUpdatedEvent =
  | CursorMovedEvent
  | ContentChangedEvent
  | BufferCreatedEvent
  | AppResizedEvent;

export const DrawContentOnBufferUpdated = (
  contentDrawer: DrawContent
): DomainEventSubscriber<BufferUpdatedEvent> => {
  const name = "app.client.draw_content_on_buffer_updated";
  const events = [
    CursorMovedEvent,
    ContentChangedEvent,
    BufferCreatedEvent,
    AppResizedEvent,
  ];

  return {
    async on(_domainEvent: BufferUpdatedEvent) {
      await contentDrawer();
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
