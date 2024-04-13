import { DomainEvent } from "../../../shared/domain/DomainEvent.js";

export class CursorMovedEvent extends DomainEvent {
  static eventName = "text.cursor.moved";
}
