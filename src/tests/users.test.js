const axios = require("axios");

const baseURL = "http://localhost:9900/users";

const request = (url, method, data) => {
  return axios({ url, method, data });
};

let userIdInsertedBeforeTests = 0;

beforeAll(async () => {
  const newUser = {
    username: (Math.random() + 1).toString(36).substring(10),
    password: "pass@test",
  };

  const response = await request(baseURL, "post", newUser);

  userIdInsertedBeforeTests = response.data.id;
});

test("Should get users", async () => {
  const response = await request(baseURL, "get");

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
});

test("Should find an user", async () => {
  const response = await request(
    `${baseURL}/${userIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data.id).toBe(userIdInsertedBeforeTests);
});

test("Should create an user", async () => {
  const newUser = {
    username: (Math.random() + 1).toString(36).substring(10),
    password: "pass@test",
  };

  const response = await request(baseURL, "post", newUser);

  expect(response.status).toBe(200);
  expect(typeof response.data).toBe("object");
  expect(response.data).toHaveProperty("id");
  expect(response.data.username).toEqual(newUser.username);

  const deleteResponse = await request(
    `${baseURL}/${response.data.id}`,
    "delete"
  );

  await request(`${baseURL}/${response.data.id}`, "delete");
});

test("Should update an user", async () => {
  const newUserData = {
    username: (Math.random() + 1).toString(36).substring(10),
    password: "pass@test@update",
  };

  const response = await request(
    `${baseURL}/${userIdInsertedBeforeTests}`,
    "put",
    newUserData
  );

  const updated = await request(
    `${baseURL}/${userIdInsertedBeforeTests}`,
    "get"
  );

  expect(response.status).toBe(200);
  expect(response.data[0]).toBe(1);
  expect(updated.data.username).toBe(newUserData.username);
});

test("Should delete an user", async () => {
  const response = await request(
    `${baseURL}/${userIdInsertedBeforeTests}`,
    "delete"
  );

  const find = await request(`${baseURL}/${userIdInsertedBeforeTests}`, "get");

  expect(response.status).toBe(200);
  expect(response.data).toBe(1);
  expect(find.data).toMatchObject({});
});
