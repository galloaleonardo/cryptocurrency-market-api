const Database = require("./../database/Database");
const schema = require("./../database/schemas/wallets");

class WalletsRepository extends Database {
  constructor() {
    super(schema);
  }

  async index() {
    const wallets = await this.model.findAll({ raw: true });
    return wallets;
  }

  async find(id) {
    return await this.model.findOne({ where: { id: id } });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.update(data, { where: { id: id } });
  }

  async delete(id) {
    return await this.model.destroy({ where: { id: id } });
  }
}

module.exports = new WalletsRepository();
