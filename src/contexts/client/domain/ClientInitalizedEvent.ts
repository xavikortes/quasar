import { DomainEvent } from "contexts/shared/domain/DomainEvent.js";

export class ClientInitializedEvent extends DomainEvent {
  static eventName = "app.client.initialized";
}
