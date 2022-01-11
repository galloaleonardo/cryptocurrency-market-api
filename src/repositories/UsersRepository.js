const Database = require("./../database/Database");
const schema = require("./../database/schemas/users");

class UsersRepository extends Database {
  constructor() {
    super(schema);
  }

  async index(filters) {
    return await this.model.findAll({ where: filters }, { raw: true });
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

module.exports = new UsersRepository();
