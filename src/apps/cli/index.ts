import { KeyboardEvent } from "contexts/client/domain/KeyboardEvent.js";
import { AppLaunchedEvent } from "contexts/shared/domain/AppLaunchedEvent.js";
import { EventBus } from "contexts/shared/domain/EventBus.js";
import { DependencyInjection } from "contexts/shared/infrastructure/DependencyInjection.js";
import { DomainEventSubscribers } from "contexts/shared/infrastructure/DomainEventSubscribers.js";
import { OpenBufferFromFile } from "contexts/text/buffer/application/OpenBufferFromFile.js";
import { PersistBufferInFile } from "contexts/text/buffer/application/PersistBufferInFile.js";
import "./di/index.js";

const di = DependencyInjection();

const eventBus = di.get<EventBus>("app.shared.eventBus");
eventBus.addSubscribers(DomainEventSubscribers.from(di));

await eventBus.publish([
  new AppLaunchedEvent({
    aggregateId: "app",
    attributes: {},
  }),
]);

while (true) {
  await new Promise((resolve) => {
    process.stdin.once("keypress", async (str, key) => {
      if (key.name === "q" && key.ctrl) {
        process.exit(0);
      }

      if (key.name === "o" && key.ctrl) {
        di.get<OpenBufferFromFile>("text.buffer.fileOpener")();
      }
      if (key.name === "s" && key.ctrl) {
        di.get<PersistBufferInFile>("text.buffer.filePersister")();
      }

      await eventBus.publish([
        new KeyboardEvent({
          aggregateId: key.name ?? str,
          attributes: {
            name: key.name ?? str,
            ctrl: key.ctrl,
            shift: key.shift,
            meta: key.meta,
          },
        }),
      ]);

      resolve(null);
    });
  });
}
