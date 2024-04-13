import { DependencyInjection } from "contexts/shared/infrastructure/DependencyInjection.js";
import { clientDependencies } from "./client.js";
import { sharedDependencies } from "./shared.js";
import { textDependencies } from "./text.js";

const di = DependencyInjection();

di.compile({
  ...sharedDependencies,
  ...clientDependencies,
  ...textDependencies,
});
