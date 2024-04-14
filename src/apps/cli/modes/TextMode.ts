import { Mode } from "contexts/shared/domain/Mode.js";
import { randomUUID } from "crypto";

export const TextMode: Mode = {
  name: "TextMode",
  bindings: {
    Default: [
      {
        action: (key) => key.length === 1,
        args: [(key: string) => key],
      },
      {
        action: "@text.cursor.writeCursor",
        args: [(key: string) => key],
      },
      "@text.cursor.moveCursorRight",
    ],
    Down: "@text.cursor.moveCursorDown",
    Up: "@text.cursor.moveCursorUp",
    Left: "@text.cursor.moveCursorLeft",
    Right: "@text.cursor.moveCursorRight",
    Home: "@text.cursor.moveCursorStartOfLine",
    End: "@text.cursor.moveCursorEndOfLine",
    "C-Home": "@text.cursor.moveCursorStartOfFile",
    "C-End": "@text.cursor.moveCursorEndOfFile",
    Delete: "@text.cursor.deleteCursor",
    Backspace: ["@text.cursor.moveCursorLeft", "@text.cursor.deleteCursor"],
    Return: [
      "@text.cursor.returnCursor",
      "@text.cursor.moveCursorDown",
      "@text.cursor.moveCursorStartOfLine",
    ],
    Space: [
      { action: "@text.cursor.writeCursor", args: [" "] },
      "@text.cursor.moveCursorRight",
    ],
    "C-o": {
      action: "@text.file.visitFile",
      args: [() => randomUUID(), "/home/javier/borrame_qsa.config.json"],
    },
    "C-s": "@text.file.persistBuffer",
  },
};
