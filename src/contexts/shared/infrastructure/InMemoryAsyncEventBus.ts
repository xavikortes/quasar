import { DomainEvent } from "../domain/DomainEvent.js";
import { EventBus } from "../domain/EventBus.js";
import { Logger } from "../domain/Logger.js";
import { DomainEventSubscribers } from "./DomainEventSubscribers.js";

export const InMemoryAsyncEventBus = (logger: Logger): EventBus => {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  const subscribers = new Map<string, Function[]>();

  return {
    publish: async (events: DomainEvent[]): Promise<void> => {
      for (const event of events) {
        // logger.info(`Event published: ${event.eventName} ${event.attributes}`);
        const subs = subscribers.get(event.eventName);

        for (const subscriber of subs ?? []) {
          subscriber(event);
        }
      }
    },
    addSubscribers: (newSubscribers: DomainEventSubscribers) => {
      for (const subscriber of newSubscribers.items) {
        for (const event of subscriber.subscribedTo()) {
          const subs = subscribers;

          subs.set(event.eventName, [
            ...(subs.get(event.eventName) ?? []),
            subscriber.on.bind(subscriber),
          ]);
        }
      }
    },
  };
};
