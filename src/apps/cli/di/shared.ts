import { ConsoleLogger } from "contexts/shared/infrastructure/ConsoleLogger.js";
import { InMemoryAsyncEventBus } from "contexts/shared/infrastructure/InMemoryAsyncEventBus.js";

const sharedInfrastructure = {
  "app.shared.logger": {
    fn: ConsoleLogger,
  },
  "app.shared.eventBus": {
    fn: InMemoryAsyncEventBus,
    args: ["@app.shared.logger"],
  },
};

export const sharedDependencies = {
  ...sharedInfrastructure,
};
