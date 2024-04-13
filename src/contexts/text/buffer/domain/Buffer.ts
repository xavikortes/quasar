import { AggregateRoot } from "../../../shared/domain/AggregateRoot.js";
import { Primitives } from "../../../shared/domain/Primitives.js";
import { BufferId } from "../../shared/domain/BufferId.js";
import { BufferContent } from "./BufferContent.js";
import { BufferCreatedEvent } from "./BufferCreatedEvent.js";
import { BufferCursor } from "./BufferCursor.js";
import { BufferName } from "./BufferName.js";
import { BufferPersistedEvent } from "./BufferPersistedEvent.js";
import { ContentChangedEvent } from "./ContentChangedEvent.js";
import { CursorMovedEvent } from "./CursorMovedEvent.js";

export type BufferPrimitives = Primitives<Buffer>;

export interface BufferProps {
  id: BufferId;
  name: BufferName;
  content: BufferContent;
  path: string;
  readonly: boolean;
  isModified: boolean;
  cursor: BufferCursor;
}

export class Buffer extends AggregateRoot {
  id: BufferId;
  name: BufferName;
  content: BufferContent;
  cursor: BufferCursor;
  path: string;
  readonly: boolean;
  isModified: boolean;

  constructor(props: BufferProps) {
    super(props);

    this.id = props.id;
    this.name = props.name;
    this.content = props.content;
    this.cursor = props.cursor;
    this.path = props.path;
    this.readonly = props.readonly;
    this.isModified = props.isModified;
  }

  length() {
    return this.content.length();
  }

  lineLenght(y: number) {
    return this.content.lineLength(y);
  }

  atBeginningOfLine() {
    return this.cursor.position.x <= 0;
  }

  atFirstLine() {
    return this.cursor.position.y <= 0;
  }

  atBeginningOfFile() {
    return this.atFirstLine() && this.atBeginningOfLine();
  }

  atEndOfLine() {
    return this.cursor.position.x >= this.lineLenght(this.cursor.position.y);
  }

  atLastLine() {
    return this.cursor.position.y >= this.length() - 1;
  }

  atEndOfFile() {
    return this.atLastLine() && this.atEndOfLine();
  }

  showName() {
    if (this.isModified) {
      return `*${this.name.value}*`;
    }
    return this.name.value;
  }

  persist() {
    this.isModified = false;

    this.record(
      new BufferPersistedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  joinNextLine() {
    const y = this.cursor.position.y;

    this.content.value[y] += this.content.value[y + 1];
    this.content.value = this.content.value.toSpliced(y + 1, 1);

    this.isModified = true;

    this.record(
      new ContentChangedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  splitLine() {
    const { x, y } = this.cursor.position;
    const line = this.content.value[y];

    this.content.value = this.content.value.toSpliced(y + 1, 0, line.slice(x));
    this.content.value[y] = line.slice(0, x);

    this.isModified = true;

    this.record(
      new ContentChangedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  writeCharacter(char: string) {
    const { x, y } = this.cursor.position;
    this.content.value[y] =
      this.content.value[y].slice(0, x) + char + this.content.value[y].slice(x);

    this.isModified = true;

    this.record(
      new ContentChangedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  deleteCharacter() {
    const { x, y } = this.cursor.position;
    this.content.value[y] =
      this.content.value[y].slice(0, x) + this.content.value[y].slice(x + 1);

    this.isModified = true;

    this.record(
      new ContentChangedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  moveCursorTo(position: { x: number; y: number }) {
    this.cursor = BufferCursor.fromPrimitves({
      position,
      offset: this.cursor.getOffset(),
    });

    this.record(
      new CursorMovedEvent({
        aggregateId: this.id.value,
        attributes: this.toPrimitives(),
      })
    );
  }

  static create(primitives: BufferPrimitives) {
    const buffer = Buffer.fromPrimitives(primitives);

    buffer.record(
      new BufferCreatedEvent({
        aggregateId: buffer.id.value,
        attributes: primitives,
      })
    );

    return buffer;
  }

  static primitivesToDomain(primitives: BufferPrimitives): BufferProps {
    return {
      id: new BufferId(primitives.id),
      name: new BufferName(primitives.name),
      content: new BufferContent(primitives.content),
      cursor: BufferCursor.fromPrimitves(primitives.cursor),
      path: primitives.path,
      readonly: primitives.readonly,
      isModified: primitives.isModified,
    };
  }

  static fromPrimitives(primitives: BufferPrimitives): Buffer {
    return new Buffer(Buffer.primitivesToDomain(primitives));
  }

  toPrimitives(): BufferPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      content: this.content.toPrimitives(),
      cursor: this.cursor.toPrimitives(),
      path: this.path,
      readonly: this.readonly,
      isModified: this.isModified,
    };
  }
}
