import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class BufferPersistedEvent extends DomainEvent {
  static eventName = "text.buffer.persisted";
}
