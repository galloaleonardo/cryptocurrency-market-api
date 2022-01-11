const axios = require("axios");

const baseURL = "http://localhost:9900/user-wallet-cryptocoins";

let jwtToken = "";
let userWalletCryptocoinIdInsertedBeforeTests = 0;

const request = (url, method, data) => {
  axios.defaults.headers.common = { Authorization: `Bearer ${jwtToken}` };

  return axios({ url, method, data });
};

beforeAll(async () => {
  const loginUrl = "http://localhost:9900/login";

  const login = await request(loginUrl, "post", {
    username: "test",
    password: "test@pass",
  });

  jwtToken = login.data.token;

  const newUserWalletCryptocoin = {
    wallet_id: 1,
    initials: "BTC",
    quantity: 2.84534,
  };

  const response = await request(baseURL, "post", newUserWalletCryptocoin);

  userWalletCryptocoinIdInsertedBeforeTests = response.data.id;
});

test("Should get user wallet cryptocoin", async () => {
  const response = await request(baseURL, "get");

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
});

test("Should find a user wallet cryptocoin", async () => {
  const response = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data.id).toBe(userWalletCryptocoinIdInsertedBeforeTests);
});

test("Should get price user wallet cryptocoin in usd", async () => {
  const response = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}/price`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("unitPriceUsd");
  expect(response.data).toHaveProperty("walletPriceInUsd");
});

test("Should create a user wallet cryptocoin", async () => {
  const newUserWalletCryptocoin = {
    wallet_id: 1,
    initials: "BNB",
    quantity: 21.9435834,
  };

  const response = await request(baseURL, "post", newUserWalletCryptocoin);

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("id");
  expect(response.data.wallet_id).toEqual(newUserWalletCryptocoin.wallet_id);
  expect(response.data.initials).toEqual(newUserWalletCryptocoin.initials);

  await request(`${baseURL}/${response.data.id}`, "delete");
});

test("Should update a user wallet cryptocoin", async () => {
  const newUserWalletCryptocoinData = {
    quantity: 4.87453,
  };

  const response = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}`,
    "put",
    newUserWalletCryptocoinData
  );

  const updated = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(response.data[0]).toBe(1);
  expect(parseFloat(updated.data.quantity)).toBe(
    newUserWalletCryptocoinData.quantity
  );
});

test("Should delete user wallet cryptocoin", async () => {
  const response = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}`,
    "delete"
  );

  const find = await request(
    `${baseURL}/${userWalletCryptocoinIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(response.data).toBe(1);
  expect(find.data).toMatchObject({});
});
