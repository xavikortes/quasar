// import { InvalidArgumentError } from "./InvalidArgumentError.js";

export type ValueObjectPrimitives = string | number | boolean | Date;

export abstract class ValueObject<T extends ValueObjectPrimitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  toString(): string {
    return this.value.toString();
  }

  ensureValueIsDefined(value: T): void {
    if (value === undefined || value === null) {
      throw new Error(
        `InvalidArgumentError: ${this.constructor.name} value must be defined`
      );
    }
  }
}
