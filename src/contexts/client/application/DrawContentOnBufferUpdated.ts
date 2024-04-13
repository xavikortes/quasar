import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { BufferPrimitives } from "contexts/text/buffer/domain/Buffer.js";
import { BufferCreatedEvent } from "contexts/text/buffer/domain/BufferCreatedEvent.js";
import { BufferPersistedEvent } from "contexts/text/buffer/domain/BufferPersistedEvent.js";
import { ContentChangedEvent } from "contexts/text/buffer/domain/ContentChangedEvent.js";
import { CursorMovedEvent } from "contexts/text/buffer/domain/CursorMovedEvent.js";
import { AppResizedEvent } from "../domain/AppResizedEvent.js";
import { DrawContent } from "./DrawContent.js";

type BufferUpdatedEvent =
  | CursorMovedEvent
  | ContentChangedEvent
  | BufferCreatedEvent
  | BufferPersistedEvent
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
    BufferPersistedEvent,
  ];

  return {
    async on(domainEvent: BufferUpdatedEvent) {
      await contentDrawer(domainEvent.attributes as BufferPrimitives);
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
