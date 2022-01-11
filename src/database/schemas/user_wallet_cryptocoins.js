const { DataTypes } = require("sequelize");

const schema = {
  name: "user_wallet_cryptocoins",
  schema: {
    wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  options: {
    tableName: "user_wallet_cryptocoins",
    timestamps: false,
  },
};

module.exports = schema;
