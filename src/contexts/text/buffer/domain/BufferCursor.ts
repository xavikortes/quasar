import { Position } from "contexts/shared/domain/Position.js";
import { Primitives } from "contexts/shared/domain/Primitives.js";

export const BufferCursor = (props: {
  position: Position;
  offset: Position;
}) => {
  const position = props.position;
  const offset = props.offset;

  return {
    position,
    offset,

    getPosition: () => position,
    getOffset: () => offset,

    clear: () => {
      position.x = 0;
      position.y = 0;
      offset.x = 0;
      offset.y = 0;
    },

    toPrimitives: () => ({
      position,
      offset,
    }),
  };
};

BufferCursor.init = () =>
  BufferCursor({
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  });

BufferCursor.fromPrimitves = (primitives: Primitives<BufferCursor>) =>
  BufferCursor({
    position: primitives.position,
    offset: primitives.offset,
  });

export type BufferCursor = ReturnType<typeof BufferCursor>;
