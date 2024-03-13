import CustomerChangeAddressEvent from "../customer/customer-change-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import ChangeAddressHandler from "../customer/handler/change-address.handler";
import SendConsoleLog1Handler from "../customer/handler/send-consolelog1.handler";
import SendConsoleLog2Handler from "../customer/handler/send-consolelog2.handler";
import EventDispatcher from "./event-dispatcher";

describe('CustomerEventDispatcher tests', () => { 
  it('should register customer created event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(eventDispatcher.getEventsHandlers['CustomerCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventsHandlers['CustomerCreatedEvent'].length).toBe(2);
    expect(eventDispatcher.getEventsHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventsHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2);
  })

  it('should notify in created event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 1,
      name: 'Customer 1',
      address: 'Customer 1 address'
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  })

  it('should notify in change address event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ChangeAddressHandler();
    eventDispatcher.register('CustomerChangeAddressEvent', eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: 1,
      name: 'Customer 1',
      address: 'Endereço do customer 1'
    });

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })
})