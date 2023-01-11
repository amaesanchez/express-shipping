"use strict";

const request = require("supertest");
const app = require("../app");
// const AxiosMockAdapter = require(
//   "axios-mock-adapter");
// const axios = require("axios");
// const axiosMock = new AxiosMockAdapter(axios);

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app).post("/shipments").send();
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error).toEqual({
      message: ["instance is required, but is undefined"],
      status: 400,
    });
  });

  test("throws error if invalid request body", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "dynamite",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error).toEqual({
      message: [
        "instance requires property \"addr\"",
        "instance requires property \"zip\""
      ],
      status: 400,
    });
  });
});
