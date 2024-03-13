import EventInterface from "../event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurrance: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOcurrance = new Date();
    this.eventData = eventData;
  }
}