"use strict";

const request = require("supertest");
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const { shipProduct, SHIPIT_SHIP_URL } = require("./shipItApi");

test("shipProduct", async function () {

  axiosMock.onGet(`${SHIPIT_SHIP_URL}`).reply(200, 5005);

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(5005);
  expect(res.statusCode).toEqual(200);
});
