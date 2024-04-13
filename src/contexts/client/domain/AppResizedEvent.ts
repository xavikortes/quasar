import { DomainEvent } from "../../shared/domain/DomainEvent.js";

export class AppResizedEvent extends DomainEvent {
  static eventName = "app.shared.resized";
}
