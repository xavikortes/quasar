import { DomainEvent } from "contexts/shared/domain/DomainEvent.js";

export class LoopEvent extends DomainEvent {
  static eventName = "app.client.loop";
}
