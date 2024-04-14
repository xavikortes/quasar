import { Position } from "contexts/shared/domain/Position.js";

export interface ClientRepository {
  init: () => Promise<void>;
  draw: (
    showName: string,
    content: string[],
    pos: Position,
    message: string
  ) => Promise<void>;
  drawMessage: (message: string) => Promise<void>;
}
