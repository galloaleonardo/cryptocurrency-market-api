const crypto = require("crypto");
const axios = require("axios");

const baseURL = "http://localhost:9900";

let refreshTokenGeneratedBeforeTests = "";

const request = (url, method, data) => {
  return axios({ url, method, data });
};

beforeAll(async () => {
  const response = await request(`${baseURL}/login`, "post", {
    username: "test",
    password: "test@pass",
  });

  refreshTokenGeneratedBeforeTests = response.data.refreshToken;
});

test("Should do a login", async () => {
  const response = await request(`${baseURL}/login`, "post", {
    username: "test",
    password: "test@pass",
  });

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("token");
});

test("Should request a token with a refresh token", async () => {
  const response = await request(`${baseURL}/refresh-token`, "post", {
    refreshToken: refreshTokenGeneratedBeforeTests,
  });

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("token");
});
