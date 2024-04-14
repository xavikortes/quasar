import { FileLogger } from "contexts/shared/infrastructure/FileLogger.js";
import { InMemoryAsyncEventBus } from "contexts/shared/infrastructure/InMemoryAsyncEventBus.js";

const sharedInfrastructure = {
  "app.shared.logger": {
    fn: FileLogger,
  },
  "app.shared.eventBus": {
    fn: InMemoryAsyncEventBus,
    args: ["@app.shared.logger"],
  },
};

export const sharedDependencies = {
  ...sharedInfrastructure,
};
