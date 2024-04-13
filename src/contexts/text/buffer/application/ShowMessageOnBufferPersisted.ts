import { ShowMessage } from "contexts/client/application/ShowMessage.js";
import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { BufferPersistedEvent } from "../domain/BufferPersistedEvent.js";

export const ShowMessageOnBufferPersisted = (
  showMessage: ShowMessage
): DomainEventSubscriber<BufferPersistedEvent> => {
  const name = "app.text.show_message_on_buffer_persisted";
  const events = [BufferPersistedEvent];

  return {
    async on(domainEvent: BufferPersistedEvent) {
      const name = domainEvent.attributes.name;

      await showMessage(`Buffer ${name} persisted!`);
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
