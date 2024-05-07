import { app, sequilize } from "../express";
import request from "supertest";

describe("Customer E2E", () => {
  
  beforeEach(async () => {
    await sequilize.sync({ force: true });
  });

  afterAll(async () => {
    await sequilize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345-678",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Main Street");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("New York");
    expect(response.body.address.zip).toBe("12345-678");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should get all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345-678",
        },
      });

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        address: {
          street: "Main Street 2",
          number: 123,
          city: "New York",
          zip: "12345-678",
        },
      });
    
    const listResponse = await request(app).get("/customer").send();  
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe("John Doe");
    expect(customer.address.street).toBe("Main Street");
  });

  it("should update a customer", async () => {
    // test code
  });

  it("should delete a customer", async () => {
    // test code
  });
});
