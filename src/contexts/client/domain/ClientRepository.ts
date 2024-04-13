import { Position } from "contexts/shared/domain/Position.js";

export interface ClientRepository {
  init: () => Promise<void>;
  draw: (showName: string, content: string[], pos: Position) => Promise<void>;
}
