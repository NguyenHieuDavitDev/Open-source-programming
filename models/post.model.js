// models/post.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    tags: {
      // Lưu dưới dạng JSON; khi filter, sử dụng LIKE so sánh chuỗi JSON
      type: DataTypes.JSON,
      defaultValue: [],
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: false,
    defaultScope: {
      where: { deleted: false },
    },
  }
);

module.exports = Post;
