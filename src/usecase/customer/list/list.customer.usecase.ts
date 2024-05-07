import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOUtput(customers);
  }
}

class OutputMapper {
  static toOUtput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((c) => ({
        id: c.id,
        name: c.name,
        address: {
          street: c.address.street,
          number: c.address.number,
          city: c.address.city,
          zip: c.address.zip,
        },
      })),
    };
  }
}
