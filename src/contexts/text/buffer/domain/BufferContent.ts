export class BufferContent {
  value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  toPrimitives() {
    return this.value;
  }

  length() {
    return this.value.length;
  }

  lineLength(lineNumber: number) {
    return this.value[lineNumber]?.length ?? 0;
  }
}
