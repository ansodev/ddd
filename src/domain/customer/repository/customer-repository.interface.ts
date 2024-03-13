import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/event/repository.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}