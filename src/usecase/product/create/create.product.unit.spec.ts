import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

const input = {
  type: "a",
  name: "name",
  price: 10,
};

describe("Create Product", () => { 
  it("should create a product", async () => { 
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      type: input.type,
      name: input.name,
      price: input.price,
    });
  });

  it('should throw an error when type is missing', async () => { 
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    await expect(usecase.execute({ ...input, type: '' })).rejects.toThrowError('Invalid type');
  })
});