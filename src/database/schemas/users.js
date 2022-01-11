const { DataTypes } = require("sequelize");

const schema = {
  name: "users",
  schema: {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "users",
    timestamps: false,
  },
};

module.exports = schema;
