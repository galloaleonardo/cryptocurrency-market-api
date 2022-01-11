const { DataTypes } = require("sequelize");

const schema = {
  name: "wallets",
  schema: {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wallet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  options: {
    tableName: "wallets",
    timestamps: false,
  },
};

module.exports = schema;
