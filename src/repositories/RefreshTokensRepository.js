const Database = require("./../database/Database");
const schema = require("./../database/schemas/refresh_tokens");

class RefreshTokensRepository extends Database {
  constructor() {
    super(schema);
  }

  async find(refreshToken) {
    return await this.model.findOne({ where: { refresh_token: refreshToken } });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async delete(id) {
    return await this.model.destroy({ where: { user_id: id } });
  }
}

module.exports = new RefreshTokensRepository();
