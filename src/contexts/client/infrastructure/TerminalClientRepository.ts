import { Position } from "contexts/shared/domain/Position.js";
import { emitKeypressEvents } from "node:readline";
import { ClientRepository } from "../domain/ClientRepository.js";

export const TerminalClientRepository = (): ClientRepository => {
  const appName = "QuasarEditor";
  const backgroundColor = 237;

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
  const clearLine = () => "\x1b[K";

  const setColors = () => `\x1b[48;5;${backgroundColor}m`;
  const invertColors = () => "\x1b[7m";

  const bold = () => "\x1b[1m";

  const clearAll = () => "\x1b[0m";

  const getSize = () => ({
    columns: process.stdout.columns,
    rows: process.stdout.rows - 1,
  });

  const draw = (content: string[]) => {
    let cmd = "";

    for (const line of content) {
      cmd += line;
      cmd += clearLine();
      cmd += "\n";
    }

    const size = getSize();
    for (let i = 0; i < size.rows - content.length; i++) {
      cmd += clearLine();
      cmd += `${" ".repeat(size.columns)}\n`;
    }

    return cmd;
  };

  const statusBar = (showName: string, position: Position) => {
    const size = getSize();

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

    return statusMessage.padEnd(size.columns + length, " ");
  };

  return {
    init,
    draw: async (showName: string, content: string[], position: Position) => {
      let cmd = "";

      cmd += clearScreen();

      cmd += setColors();
      cmd += draw(content);

      cmd += invertColors();
      cmd += statusBar(showName, position);

      cmd += clearAll();

      const lineSize = content[position.y].length;

      // -0 === offset
      cmd += setCursor(
        Math.min(position.y, content.length) - 0 + 1,
        Math.min(position.x, lineSize) - 0 + 1
      );

      process.stdout.write(cmd);
    },
  };
};
