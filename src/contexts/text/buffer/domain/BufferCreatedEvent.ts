import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class BufferCreatedEvent extends DomainEvent {
  static eventName = "text.buffer.created";
}
