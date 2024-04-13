import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class ContentChangedEvent extends DomainEvent {
  static eventName = "text.buffer.changed";
}
