import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
  name: "Anso",
  address: {
    street: "Rua A",
    number: 10,
    city: "Cidade B",
    zip: "123",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}


describe("Create Customer", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUsecase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    });

  });

  it('should throw an error when name is missing', async () => { 
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUsecase(customerRepository);

   await expect(usecase.execute({ ...input, name: '' })).rejects.toThrowError('Name');
  })

  it('should throw an error when street is missing', async () => { 
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUsecase(customerRepository);

    input.address.street = '';

   await expect(usecase.execute(input)).rejects.toThrowError('Street');
  })
});
