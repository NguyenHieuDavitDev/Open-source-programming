const sequelize = require("../config/database");
const Product = require("./product");

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synchronized!");
};

module.exports = { sequelize, Product, syncDatabase };
