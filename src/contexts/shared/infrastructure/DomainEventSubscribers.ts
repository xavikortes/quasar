import { DomainEvent } from "../domain/DomainEvent.js";
import { DomainEventSubscriber } from "../domain/DomainEventSubscriber.js";
import { DependencyInjection } from "./DependencyInjection.js";

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  static from(container: DependencyInjection): DomainEventSubscribers {
    const subscribers = container.fromTag(
      "eventSubscriber"
    ) as DomainEventSubscriber<DomainEvent>[];

    return new DomainEventSubscribers(subscribers);
  }
}
