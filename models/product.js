const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true }, // Trường xóa mềm
  },
  {
    timestamps: true,
    paranoid: true, // Bật chế độ xóa mềm
  }
);

module.exports = Product;
