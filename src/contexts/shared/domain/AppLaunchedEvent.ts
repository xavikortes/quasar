import { DomainEvent } from "./DomainEvent.js";

export class AppLaunchedEvent extends DomainEvent {
  static eventName = "app.shared.launched";
}
