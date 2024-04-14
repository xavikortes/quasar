import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { ClientMessageEvent } from "../domain/ClientMessageEvent.js";
import { DrawMessage } from "./DrawMessage.js";

export const DrawMessageOnClientMessage = (
  messageDrawer: DrawMessage
): DomainEventSubscriber<ClientMessageEvent> => {
  const name = "app.client.draw_message_on_client_message";
  const events = [ClientMessageEvent];

  return {
    async on(domainEvent: ClientMessageEvent) {
      await messageDrawer(domainEvent.attributes as { message: string });
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
