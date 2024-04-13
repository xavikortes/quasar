import { KeyboardEvent } from "contexts/client/domain/KeyboardEvent.js";
import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { DependencyInjection } from "contexts/shared/infrastructure/DependencyInjection.js";
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

export interface Key {
  name: string;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
}

export const DispatchBindingOnKeyboardEvent =
  (): DomainEventSubscriber<KeyboardEvent> => {
    const name = "app.text.dispatch_binding_on_keyboard";
    const events = [KeyboardEvent];

    const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

    const isLetter = (key: string) => /^[a-z]{1}$/.test(key);
    const isSpecial = (key: string) => !isLetter(key) && key.length > 1;

    const keyToStr = (key: Key): string => {
      let keyStr = "";
      const isLetterKey = isLetter(key.name);
      const isSpecialKey = isSpecial(key.name);

      if (key.ctrl) keyStr += "C-";
      if (key.shift && !isLetterKey) keyStr += "S-";
      if (key.meta) keyStr += "M-";

      if (key.shift && isLetterKey) keyStr += key.name.toUpperCase();
      else if (isSpecialKey) keyStr += capitalize(key.name);
      else keyStr += key.name;

      return keyStr;
    };

    const di = DependencyInjection();

    return {
      async on(domainEvent: KeyboardEvent) {
        const key = keyToStr(domainEvent.attributes as unknown as Key);

        switch (key) {
          case "Down":
            await di.get<MoveCursorDown>("text.cursor.moveCursorDown")();
            break;
          case "Up":
            await di.get<MoveCursorUp>("text.cursor.moveCursorUp")();
            break;
          case "Left":
            await di.get<MoveCursorLeft>("text.cursor.moveCursorLeft")();
            break;
          case "Right":
            await di.get<MoveCursorRight>("text.cursor.moveCursorRight")();
            break;
          case "Home":
            await di.get<MoveCursorStartOfLine>(
              "text.cursor.moveCursorStartOfLine"
            )();
            break;
          case "End":
            await di.get<MoveCursorEndOfLine>(
              "text.cursor.moveCursorEndOfLine"
            )();
            break;
          case "C-Home":
            await di.get<MoveCursorStartOfFile>(
              "text.cursor.moveCursorStartOfFile"
            )();
            break;
          case "C-End":
            await di.get<MoveCursorEndOfFile>(
              "text.cursor.moveCursorEndOfFile"
            )();
            break;
          case "Delete":
            await di.get<DeleteCursor>("text.cursor.deleteCursor")();
            break;
          case "Backspace": {
            if (!(await di.get<MoveCursorLeft>("text.cursor.moveCursorLeft")()))
              break;
            di.get<DeleteCursor>("text.cursor.deleteCursor")();
            break;
          }
          case "Return":
            if (!(await di.get<ReturnCursor>("text.cursor.returnCursor")()))
              break;
            if (!(await di.get<MoveCursorDown>("text.cursor.moveCursorDown")()))
              break;
            await di.get<MoveCursorStartOfLine>(
              "text.cursor.moveCursorStartOfLine"
            )();
            break;
          case "Space":
            if (!(await di.get<WriteCursor>("text.cursor.writeCursor")(" ")))
              break;
            await di.get<MoveCursorRight>("text.cursor.moveCursorRight")();
            break;
          default:
            if (key.length > 1) break;

            if (!(await di.get<WriteCursor>("text.cursor.writeCursor")(key)))
              break;
            await di.get<MoveCursorRight>("text.cursor.moveCursorRight")();
            break;
        }
      },
      subscribedTo: () => events,
      name: () => name,
    };
  };
