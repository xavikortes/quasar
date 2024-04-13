import { DomainEventSubscribers } from "../infrastructure/DomainEventSubscribers.js";
import { DomainEvent } from "./DomainEvent.js";

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void;
}
