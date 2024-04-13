import { AppLaunchedEvent } from "contexts/client/domain/AppLaunchedEvent.js";
import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { BufferCursor } from "../domain/BufferCursor.js";
import { CreateBuffer } from "./CreateBuffer.js";

export const CreateWelcomeBufferOnAppLaunched = (
  bufferCreator: CreateBuffer
): DomainEventSubscriber<AppLaunchedEvent> => {
  const name = "app.text.create_welcome_buffer_on_app_launched";
  const events = [AppLaunchedEvent];

  return {
    async on(_domainEvent: AppLaunchedEvent) {
      await bufferCreator({
        id: "welcome",
        name: "Welcome",
        content: [
          "Welcome to Quasar!",
          "",
          "You will enjoy writing in here.",
          "",
          "Press 'Ctrl + Q' to exit.",
        ],
        cursor: BufferCursor.init(),
        readonly: true,
        path: "",
        isModified: false,
      });
    },
    subscribedTo: () => events,
    name: () => name,
  };
};
