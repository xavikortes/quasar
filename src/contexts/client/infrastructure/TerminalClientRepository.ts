import { Position } from "contexts/shared/domain/Position.js";
import { emitKeypressEvents } from "node:readline";
import { ClientRepository } from "../domain/ClientRepository.js";

export const TerminalClientRepository = (): ClientRepository => {
  const appName = "QuasarEditor";
  const backgroundColor = 237;
  const messageForegroundColor = 63;

  const init = async () => {
    emitKeypressEvents(process.stdin);
    enableRawMode();

    process.on("exit", () => {
      process.stdout.write(clearAll());
      process.stdout.write(clearScreen());
      disableRawMode();
    });
  };

  const enableRawMode = () => process.stdin.setRawMode(true);
  const disableRawMode = () => process.stdin.setRawMode(false);

  const clearScreen = () => `\x1b[2J\x1b[3J${setCursor(0, 0)}`;

  const setCursor = (y: number, x: number) => `\x1b[${y};${x}H`;
  const saveCursorPos = () => "\x1b[s";
  const restoreCursorPos = () => "\x1b[u";

  const clearLine = () => "\x1b[K";

  const setColors = () => `\x1b[48;5;${backgroundColor}m`;
  const setMessageColors = () => `\x1b[38;5;${messageForegroundColor}m`;
  const invertColors = () => "\x1b[7m";

  const bold = () => "\x1b[1m";

  const clearAll = () => "\x1b[0m";

  const getSize = () => ({
    columns: process.stdout.columns,
    rows: process.stdout.rows - 2,
  });

  const getOffset = (position: Position, lastOffset: Position) => {
    const { rows, columns } = getSize();
    const { x, y } = position;

    const offset = lastOffset;

    if (y >= rows + lastOffset.y) {
      offset.y = y - rows + 1;
    } else if (y < lastOffset.y) {
      offset.y = y;
    }

    if (x >= columns + lastOffset.x) {
      offset.x = x - columns + 1;
    } else if (x < lastOffset.x) {
      offset.x = x;
    }

    return offset;
  };

  const draw = (content: string[], offset: Position) => {
    const { rows, columns } = getSize();

    const showedContent = content.slice(offset.y, offset.y + rows);

    let cmd = "";

    for (const line of showedContent) {
      cmd += line.slice(offset.x, offset.x + columns);
      cmd += clearLine();
      cmd += "\n";
    }

    for (let i = 0; i < rows - showedContent.length; i++) {
      cmd += clearLine();
      cmd += "\n";
    }

    return cmd;
  };

  const statusBar = (showName: string, position: Position) => {
    const { columns } = getSize();

    let statusMessage = "";
    let length = 0;

    const add = (message: string, isCmd = false) => {
      statusMessage += message;
      if (isCmd) length += message.length;
    };

    add(bold(), true);
    add(" ");
    add(appName);
    add(clearAll(), true);
    add(invertColors(), true);
    add(" - ");
    add(showName);
    add(" - ");
    add(`Pos. ${position.y + 1}:${position.x + 1}`);

    return statusMessage.padEnd(columns + length, " ");
  };

  const messageBar = (message: string) => {
    const { columns } = getSize();

    let showMessage = "";
    let length = 0;

    const add = (m: string, isCmd = false) => {
      showMessage += m;
      if (isCmd) length += m.length;
    };

    add(setColors(), true);
    add(setMessageColors(), true);
    add(" ");
    add(message);

    return showMessage.padEnd(columns + length, " ");
  };

  return {
    init,
    draw: async (
      showName: string,
      content: string[],
      position: Position,
      offset: Position,
      message: string
    ) => {
      let cmd = "";

      const newOffset = getOffset(position, offset);

      cmd += clearScreen();

      cmd += setColors();
      cmd += draw(content, newOffset);

      cmd += invertColors();
      cmd += statusBar(showName, position);

      cmd += clearAll();
      cmd += messageBar(message);

      cmd += clearAll();

      const lineSize = content[position.y].length;

      // -0 === offset
      cmd += setCursor(
        Math.min(position.y, content.length) - newOffset.y + 1,
        Math.min(position.x, lineSize) - newOffset.x + 1
      );

      process.stdout.write(cmd);
    },
    drawMessage: async (message: string) => {
      const { rows } = getSize();

      let cmd = "";

      cmd += saveCursorPos();
      cmd += setCursor(rows + 2, 0);

      cmd += messageBar(message);

      cmd += clearAll();
      cmd += restoreCursorPos();

      process.stdout.write(cmd);
    },
  };
};
