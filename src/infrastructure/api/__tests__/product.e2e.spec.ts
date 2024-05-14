import { app, sequilize } from "../express";
import request from "supertest";

describe("Product E2E", () => {
  
  beforeEach(async () => {
    await sequilize.sync({ force: true });
  });

  afterAll(async () => {
    await sequilize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.type).toBe("a");
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product A",
    });

    expect(response.status).toBe(500);
  });

  it("should get all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 10,
      });

    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 20,
      });
        
    const listResponse = await request(app).get("/product").send();  
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    const product2 = listResponse.body.products[1];
    expect(product2.id).toBeDefined();
    expect(product2.name).toBe("Product B");
    expect(product2.price).toBe(40);
  });
});
