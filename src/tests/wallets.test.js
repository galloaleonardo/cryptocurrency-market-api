const crypto = require("crypto");
const axios = require("axios");

const baseURL = "http://localhost:9900/wallets";

let jwtToken = "";
let walletIdInsertedBeforeTests = 0;

const request = (url, method, data) => {
  axios.defaults.headers.common = { Authorization: `Bearer ${jwtToken}` };

  return axios({ url, method, data });
};

const createHash = () => {
  const random = crypto.randomBytes(20).toString("hex");
  const time = new Date().getTime();
  const unique = random + time;

  return crypto.createHash("sha256").update(unique).digest("hex");
};

beforeAll(async () => {
  const loginUrl = "http://localhost:9900/login";

  const login = await request(loginUrl, "post", {
    username: "test",
    password: "test@pass",
  });

  jwtToken = login.data.token;

  const newWallet = {
    user_id: 1,
    wallet: createHash(),
  };

  const response = await request(baseURL, "post", newWallet);

  walletIdInsertedBeforeTests = response.data.id;
});

test("Should get wallets", async () => {
  const response = await request(baseURL, "get");

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
});

test("Should find a wallet", async () => {
  const response = await request(
    `${baseURL}/${walletIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data.id).toBe(walletIdInsertedBeforeTests);
});

test("Should create a wallet", async () => {
  const newWallet = {
    user_id: 1,
    wallet: createHash(),
  };

  const response = await request(baseURL, "post", newWallet);

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("id");
  expect(response.data.wallet).toEqual(newWallet.wallet);
});

test("Should update a wallet", async () => {
  const newWalletData = {
    user_id: 2,
    wallet: createHash(),
  };

  const response = await request(
    `${baseURL}/${walletIdInsertedBeforeTests}`,
    "put",
    newWalletData
  );

  const updated = await request(
    `${baseURL}/${walletIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(response.data[0]).toBe(1);
  expect(updated.data.wallet).toBe(newWalletData.wallet);
});

test("Should delete a wallet", async () => {
  const response = await request(
    `${baseURL}/${walletIdInsertedBeforeTests}`,
    "delete"
  );

  const find = await request(
    `${baseURL}/${walletIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(response.data).toBe(1);
  expect(find.data).toMatchObject({});
});
