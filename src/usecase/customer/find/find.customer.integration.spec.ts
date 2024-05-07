import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repostitory/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repostitory/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

describe('Find Customer', () => { 
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, 'zip', 'city');
    customer.changeAddress(address);
    const customerReository = new CustomerRepository();
    const usecase = new FindCustomerUsecase(customerReository)
    await customerReository.create(customer);

    const input = { id: '1' };

    const output = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 123,
        city: 'city',
        zip: 'zip',
      }
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

});