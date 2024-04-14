import { ClientRepository } from "../domain/ClientRepository.js";
import { ClientMessageRepository } from "../infrastructure/ClientMessageRepository.js";

export const DrawMessage = (
  repository: ClientRepository,
  messageRepository: ClientMessageRepository
) => {
  return async ({ message }: { message: string }) => {
    await repository.drawMessage(message);

    messageRepository.clear();
  };
};

export type DrawMessage = ReturnType<typeof DrawMessage>;
