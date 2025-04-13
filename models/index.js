// models/index.js
const sequelize = require("../config/db");
const User = require("./user.model");
const Role = require("./role.model");
const Post = require("./post.model");

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

Post.belongsTo(User, { foreignKey: "author_id" });
User.hasMany(Post, { foreignKey: "author_id" });

module.exports = {
  sequelize,
  User,
  Role,
  Post,
};
