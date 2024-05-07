import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

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
    const product1 = ProductFactory.createProduct('a', 'Product 1', 10);
    const product2 = ProductFactory.createProduct('a', 'Product 2', 20);

    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const result = await usecase.execute({});

    const output = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price
        }
      ]
    }
   
    expect(result).toEqual(output);
  });
});