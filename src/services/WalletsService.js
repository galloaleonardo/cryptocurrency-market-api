const repository = require("../repositories/WalletsRepository");

class WalletsService {
  async index() {
    return await repository.index();
  }

  async find(id) {
    const data = await repository.find(id);

    return data && data.dataValues ? data.dataValues : {};
  }

  async create(data) {
    const created = await repository.create(data);

    return created && created.dataValues ? created.dataValues : {};
  }

  async update(id, data) {
    return await repository.update(id, data);
  }

  async delete(id) {
    return await repository.delete(id);
  }
}

module.exports = new WalletsService();
