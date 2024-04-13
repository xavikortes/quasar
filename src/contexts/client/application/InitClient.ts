import { EventBus } from "contexts/shared/domain/EventBus.js";
import { ClientInitializedEvent } from "../domain/ClientInitalizedEvent.js";
import { ClientRepository } from "../domain/ClientRepository.js";

export const InitClient = (
  repository: ClientRepository,
  eventBus: EventBus
) => {
  return async () => {
    await repository.init();

    await eventBus.publish([
      new ClientInitializedEvent({
        aggregateId: "client",
        attributes: {},
      }),
    ]);
  };
};

export type InitClient = ReturnType<typeof InitClient>;
