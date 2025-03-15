const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("QLSP_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
