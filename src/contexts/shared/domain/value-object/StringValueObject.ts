import { ValueObject } from "./ValueObject.js";

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.checkValueType(value);
  }

  private checkValueType(value: string): void {
    if (typeof value !== "string") {
      throw new Error(
        `InvalidArgumentError: ${this.constructor.name} debe ser de tipo string`
      );
    }
  }
}
