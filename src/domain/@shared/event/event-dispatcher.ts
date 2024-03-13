import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";
import EventDispatcherInterface from "./evente-dispatcher.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [event: string]: EventHandlerInterface[];
  } = {};

  get getEventsHandlers(): { [event: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((handler) => handler.handle(event));
    }
  }

  register(event: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(eventHandler);
  }

  unregister(event: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event] = this.eventHandlers[event].filter(
        (handler) => handler !== eventHandler
      );
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
  
}