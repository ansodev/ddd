import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase.dto";

const product = ProductFactory.createProduct('a', 'Product 1', 10);

const updateProduct = {
  id: '1',
  name: 'Product 1 Updated',
  price: 20
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };
};

describe('Update Product', () => { 
  it('should update product', async () => { 
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(updateProduct);
    expect(output).toEqual(updateProduct);
  });
});