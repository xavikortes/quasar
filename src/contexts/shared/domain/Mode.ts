export type KeyFn = (key: string) => unknown;

export type BindingArg = string | KeyFn;
export type BindingAction = string | KeyFn;

export interface BindingObject {
  action: BindingAction;
  args?: BindingArg[];
}

export type Binding = string | BindingObject;

export interface ModeBindings {
  [key: string]: Binding | Binding[];
}

export interface Mode {
  name: string;
  bindings: ModeBindings;
}
