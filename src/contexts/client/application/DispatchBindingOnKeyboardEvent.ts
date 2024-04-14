import { TextMode } from "apps/cli/modes/TextMode.js";
import { KeyboardEvent } from "contexts/client/domain/KeyboardEvent.js";
import { DomainEventSubscriber } from "contexts/shared/domain/DomainEventSubscriber.js";
import { DependencyInjection } from "contexts/shared/infrastructure/DependencyInjection.js";

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

    return {
      async on(domainEvent: KeyboardEvent) {
        const di = DependencyInjection();
        const key = keyToStr(domainEvent.attributes as unknown as Key);

        const mode = TextMode;
        const bindings = [mode.bindings[key] || mode.bindings.Default].flat();

        for (const binding of bindings) {
          let action = null;
          let args: unknown[] = [];

          switch (typeof binding) {
            case "string":
              action = di.get(binding.slice(1));
              args = [];
              break;
            case "object":
              if (typeof binding.action === "string") {
                action = di.get(binding.action.slice(1));
              } else {
                action = binding.action;
              }
              args =
                binding.args?.map((arg) =>
                  typeof arg === "string" ? arg : arg(key)
                ) || [];
              break;
            default:
              throw new Error("Invalid binding type");
          }

          const result = await action(...args);
          if (!result) {
            break;
          }
        }
      },
      subscribedTo: () => events,
      name: () => name,
    };
  };
