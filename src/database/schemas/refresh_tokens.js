const { DataTypes } = require("sequelize");

const schema = {
  name: "refresh_tokens",
  schema: {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "refresh_tokens",
    timestamps: false,
  },
};

module.exports = schema;
