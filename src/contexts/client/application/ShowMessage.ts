import { EventBus } from "contexts/shared/domain/EventBus.js";
import { ClientMessageEvent } from "../domain/ClientMessageEvent.js";
import { ClientMessageRepository } from "../infrastructure/ClientMessageRepository.js";

export const ShowMessage = (
  messageRepository: ClientMessageRepository,
  eventBus: EventBus
) => {
  return async (message: string) => {
    messageRepository.setMessage(message);

    eventBus.publish([
      new ClientMessageEvent({
        aggregateId: "message",
        attributes: {},
      }),
    ]);
  };
};

export type ShowMessage = ReturnType<typeof ShowMessage>;
