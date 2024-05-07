import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUseCase from "./find.product.usecase";

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
    const usecase = new FindProductUseCase(productRepository);
    await productRepository.create(product);
    const input = { id: product.id };
    const output = {
      id: product.id,
      name: 'Product 1',
      price: 10,
    }

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});