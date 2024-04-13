import { Position } from "contexts/shared/domain/Position.js";

export interface ClientRepository {
  init: () => Promise<void>;
  draw: (content: string[], pos: Position) => Promise<void>;
}
