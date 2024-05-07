import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress('Anso', new Address('Rua 1', 1, 'Cidade 1', '12345-678'));
const customer2 = CustomerFactory.createWithAddress('Bnso', new Address('Rua 2', 2, 'Cidade 2', '12345-678'));

const mockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue(Promise.resolve([customer1, customer2])),
  };
}

describe('ListCustomer', () => {
  it('should list all customers', async () => { 
    const repository = mockRepository();
    const useCase = new ListCustomerUseCase(repository);
    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
  });
});
