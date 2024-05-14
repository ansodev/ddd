import Product from "./product";


describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product('', 'Product', 100);
    }).toThrow('Product: Id is required')
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product('123', '', 100);
    }).toThrow('Product: Name is required');
  })

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product('123', 'Product', -2);
    }).toThrow('Price must be greater than zero')
  })

  it('should acumulate errors', () => { 
    expect(() => {
      const product = new Product('', '', -2);
    }).toThrow('Product: Id is required, Product: Name is required, Product: Price must be greater than zero')
  });

  it("should change name", () => {
    const product = new Product('123', 'Product', 10);

    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  })

  it("should change price", () => {
    const product = new Product('123', 'Product', 10);

    product.changePrice(150);

    expect(product.price).toBe(150);
  })

})