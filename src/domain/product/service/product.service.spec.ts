import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the price of all products", () => {
    const prod1 = new Product('1', 'Prod 1', 10);
    const prod2 = new Product('2', 'Prod 2', 20);
    const products = [prod1, prod2];
    
    ProductService.increasePrice(products, 50);

    expect(prod1.price).toBe(15);
    expect(prod2.price).toBe(30);
  })
})