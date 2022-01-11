const bcrypt = require("bcrypt");
const repository = require("../repositories/UsersRepository");

class UsersService {
  async index(filters) {
    return await repository.index(filters);
  }

  async find(id) {
    const data = await repository.find(id);

    return data && data.dataValues ? data.dataValues : {};
  }

  async create(data) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    data.password = password;

    const created = await repository.create(data);

    return created && created.dataValues ? created.dataValues : {};
  }

  async update(id, data) {
    if (data && data.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(data.password, salt);

      data.password = password;
    }

    return await repository.update(id, data);
  }

  async delete(id) {
    return await repository.delete(id);
  }
}

module.exports = new UsersService();
