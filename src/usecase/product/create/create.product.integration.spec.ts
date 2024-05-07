import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

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
    const input = {
      type: 'a',
      name: 'Product 1',
      price: 10,
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      type: 'a',
      name: 'Product 1',
      price: 10,
    });
  });
});