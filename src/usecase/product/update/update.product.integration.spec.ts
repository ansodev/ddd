import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase.dto";

describe('Find Product integration', () => { 
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a product', async () => { 
    const product = ProductFactory.createProduct('a', 'Product 1', 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const usecase = new UpdateProductUseCase(productRepository);
    const input = {
      id: product.id,
      name: 'Product updated',
      price: 20,
    };
    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});