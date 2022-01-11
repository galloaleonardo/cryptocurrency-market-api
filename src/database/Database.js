const Sequelize = require("sequelize");

class Database {
  constructor(schema) {
    this.model = {};
    this.setModel(schema);
  }

  async setModel(schema) {
    const connection = await this.connect();
    this.model = await this.setSchema(connection, schema);
  }

  async connect() {
    return new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
      }
    );
  }

  async setSchema(connection, schema) {
    return await this.defineModel(connection, schema);
  }

  async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);

    await model.sync();

    return model;
  }
}

module.exports = Database;
