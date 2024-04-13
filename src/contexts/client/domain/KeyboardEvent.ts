import { DomainEvent } from "contexts/shared/domain/DomainEvent.js";

export class KeyboardEvent extends DomainEvent {
  static eventName = "app.client.keyboard";
}
