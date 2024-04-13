import { DomainEvent } from "./DomainEvent.js";
import { StringValueObject } from "./value-object/StringValueObject.js";

export interface AggregateRootProps {
  id: StringValueObject;
}

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[];
  public readonly id: StringValueObject;

  constructor(_props: AggregateRootProps) {
    this.id = _props.id;
    this.domainEvents = [];
  }

  abstract toPrimitives(): unknown;

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents = this.domainEvents.filter(
      (e) => e.eventName !== event.eventName
    );
    this.domainEvents.push(event);
  }

  recordDeleted(a: AggregateRoot): void {}
}
