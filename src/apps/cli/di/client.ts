import { DispatchBindingOnKeyboardEvent } from "contexts/client/application/DispatchBindingOnKeyboardEvent.js";
import { DrawContent } from "contexts/client/application/DrawContent.js";
import { DrawContentOnBufferUpdated } from "contexts/client/application/DrawContentOnBufferUpdated.js";
import { InitClient } from "contexts/client/application/InitClient.js";
import { InitClientOnAppLaunched } from "contexts/client/application/InitClientOnAppLaunched.js";
import { ShowMessage } from "contexts/client/application/ShowMessage.js";
import { ClientMessageRepository } from "contexts/client/infrastructure/ClientMessageRepository.js";
import { TerminalClientRepository } from "contexts/client/infrastructure/TerminalClientRepository.js";

const clientInfrastructure = {
  "app.client.message": {
    fn: ClientMessageRepository,
  },
  "app.client.repository": {
    fn: TerminalClientRepository,
    args: ["@app.client.message"],
  },
};

const clientUseCases = {
  "app.client.clientInitializer": {
    fn: InitClient,
    args: ["@app.client.repository", "@app.shared.eventBus"],
  },
  "app.client.contentDrawer": {
    fn: DrawContent,
    args: ["@app.client.repository"],
  },
  "app.client.showMessage": {
    fn: ShowMessage,
    args: ["@app.client.message", "@app.shared.eventBus"],
  },
};

const clientSubscribers = {
  "app.client.InitClientOnAppLaunched": {
    fn: InitClientOnAppLaunched,
    args: ["@app.client.clientInitializer"],
    tags: ["eventSubscriber"],
  },
  "app.client.DrawContentOnBufferUpdated": {
    fn: DrawContentOnBufferUpdated,
    args: ["@app.client.contentDrawer"],
    tags: ["eventSubscriber"],
  },
  "app.client.DispatchBindingOnKeyboardEvent": {
    fn: DispatchBindingOnKeyboardEvent,
    args: [],
    tags: ["eventSubscriber"],
  },
};

export const clientDependencies = {
  ...clientInfrastructure,
  ...clientUseCases,
  ...clientSubscribers,
};
