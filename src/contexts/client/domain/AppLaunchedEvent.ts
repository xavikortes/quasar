import { DomainEvent } from "../../shared/domain/DomainEvent.js";

export class AppLaunchedEvent extends DomainEvent {
  static eventName = "app.shared.launched";
}
