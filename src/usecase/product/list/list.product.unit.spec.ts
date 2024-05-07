import ListProductUseCase from "./list.product.usecase";

const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 20,
  },
];

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue(Promise.resolve(products)),
  };
}

describe('List Product', () => { 
  it('should list products', async () => {
    const productRepository = MockRepository();

    productRepository.findAll.mockReturnValue(Promise.resolve(products));

    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products.length).toEqual(2);
    expect(output.products[0].id).toEqual(products[0].id);
    expect(output.products[0].name).toEqual(products[0].name);
    expect(output.products[0].price).toEqual(products[0].price);
    expect(output.products[1].id).toEqual(products[1].id);
    expect(output.products[1].name).toEqual(products[1].name);
    expect(output.products[1].price).toEqual(products[1].price);
  });

});