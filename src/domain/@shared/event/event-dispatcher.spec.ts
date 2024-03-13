import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";

describe('Domain events tests', () => {
  it('should register event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
  });

  it('should unregister event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'].length).toBe(0);
  })
  
  it('should unregister all events', () => { 
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent']).toBeUndefined();
    expect(eventDispatcher.getEventsHandlers).toMatchObject({});
  });

  it('should notify event', () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    expect(eventDispatcher.getEventsHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10
    });
    
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled(); 
  });
});
