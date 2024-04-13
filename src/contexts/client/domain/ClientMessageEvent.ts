import { DomainEvent } from "../../shared/domain/DomainEvent.js";

export class ClientMessageEvent extends DomainEvent {
  static eventName = "app.client.message";
}
