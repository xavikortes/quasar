import { randomUUID } from "node:crypto";
import { PrimitiveId } from "./Primitives.js";

export type DomainEventAttributes = Record<string, unknown>;

export type DomainEventProps = {
  aggregateId: PrimitiveId;
  eventId?: string;
  occurredOn?: Date;
  attributes: DomainEventAttributes;
};

export abstract class DomainEvent {
  static eventName = "domain_event";
  static fromPrimitives: (params: DomainEventProps) => DomainEvent;

  readonly aggregateId: PrimitiveId;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;
  readonly attributes: DomainEventAttributes;

  constructor(params: DomainEventProps) {
    const { aggregateId, eventId, occurredOn, attributes } = params;
    this.aggregateId = aggregateId;
    this.eventId = eventId ?? randomUUID();
    this.occurredOn = occurredOn ?? new Date();
    this.attributes = attributes;
    // @ts-expect-error eventName is static
    this.eventName = this.constructor.eventName as string;
  }
}

export type DomainEventClass<T extends DomainEvent = DomainEvent> = {
  new (params: DomainEventProps): T;
  eventName: string;

  fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }): DomainEvent;
};
