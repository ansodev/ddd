import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOcurrance: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOcurrance = new Date();
    this.eventData = eventData;
  }
}