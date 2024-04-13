import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { AppLaunchedEvent } from "../domain/AppLaunchedEvent.js";
import { InitClient } from "./InitClient.js";

export const InitClientOnAppLaunched = (
  clientInitializer: InitClient
): DomainEventSubscriber<AppLaunchedEvent> => {
  const name = "app.client.init_client_on_app_launched";
  const events = [AppLaunchedEvent];

  return {
    async on(_domainEvent: AppLaunchedEvent) {
      await clientInitializer();
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
