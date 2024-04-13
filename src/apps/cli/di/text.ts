import { CreateBuffer } from "contexts/text/buffer/application/CreateBuffer.js";
import { CreateWelcomeBufferOnAppLaunched } from "contexts/text/buffer/application/CreateWelcomeBufferOnAppLaunched.js";
import { FindBuffer } from "contexts/text/buffer/application/FindBuffer.js";
import { OpenBufferFromFile } from "contexts/text/buffer/application/OpenBufferFromFile.js";
import { PersistBufferInFile } from "contexts/text/buffer/application/PersistBufferInFile.js";
import { SearchAllBuffers } from "contexts/text/buffer/application/SearchAllBuffers.js";
import { InMemoryBufferRepository } from "contexts/text/buffer/infrastructure/InMemoryBufferRepository.js";
import { DeleteCursor } from "contexts/text/cursor/application/DeleteCursor.js";
import { MoveCursorDown } from "contexts/text/cursor/application/MoveCursorDown.js";
import { MoveCursorEndOfFile } from "contexts/text/cursor/application/MoveCursorEndOfFile.js";
import { MoveCursorEndOfLine } from "contexts/text/cursor/application/MoveCursorEndOfLine.js";
import { MoveCursorLeft } from "contexts/text/cursor/application/MoveCursorLeft.js";
import { MoveCursorRight } from "contexts/text/cursor/application/MoveCursorRight.js";
import { MoveCursorStartOfFile } from "contexts/text/cursor/application/MoveCursorStartOfFile.js";
import { MoveCursorStartOfLine } from "contexts/text/cursor/application/MoveCursorStartOfLine.js";
import { MoveCursorUp } from "contexts/text/cursor/application/MoveCursorUp.js";
import { ReturnCursor } from "contexts/text/cursor/application/ReturnCursor.js";
import { WriteCursor } from "contexts/text/cursor/application/WriteCursor.js";

const textInfrastructure = {
  "text.buffer.repository": {
    fn: InMemoryBufferRepository,
  },
};

const textUseCases = {
  "text.buffer.creator": {
    fn: CreateBuffer,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.buffer.finder": {
    fn: FindBuffer,
    args: ["@text.buffer.repository"],
  },
  "text.buffer.allSearcher": {
    fn: SearchAllBuffers,
    args: ["@text.buffer.repository"],
  },
  "text.buffer.fileOpener": {
    fn: OpenBufferFromFile,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.buffer.filePersister": {
    fn: PersistBufferInFile,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorDown": {
    fn: MoveCursorDown,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorUp": {
    fn: MoveCursorUp,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorLeft": {
    fn: MoveCursorLeft,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorRight": {
    fn: MoveCursorRight,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorStartOfLine": {
    fn: MoveCursorStartOfLine,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorEndOfLine": {
    fn: MoveCursorEndOfLine,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorStartOfFile": {
    fn: MoveCursorStartOfFile,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.moveCursorEndOfFile": {
    fn: MoveCursorEndOfFile,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.deleteCursor": {
    fn: DeleteCursor,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.returnCursor": {
    fn: ReturnCursor,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
  "text.cursor.writeCursor": {
    fn: WriteCursor,
    args: ["@text.buffer.repository", "@app.shared.eventBus"],
  },
};

const textSubscribers = {
  "text.buffer.CreateWelcomeBufferOnAppLaunched": {
    fn: CreateWelcomeBufferOnAppLaunched,
    args: ["@text.buffer.creator"],
    tags: ["eventSubscriber"],
  },
};

export const textDependencies = {
  ...textInfrastructure,
  ...textUseCases,
  ...textSubscribers,
};
