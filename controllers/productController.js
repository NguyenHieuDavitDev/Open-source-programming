const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

// Lấy tất cả sản phẩm chưa bị xóa mềm
exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({ where: { deletedAt: null } });
  res.render("products/index", { products });
};

// Hiển thị form thêm sản phẩm
exports.getAddProductForm = (req, res) => {
  res.render("products/add");
};

// Thêm sản phẩm
exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : "default.jpg";

  await Product.create({ name, price, description, image });
  res.redirect("/products");
};

// Hiển thị form sửa sản phẩm
exports.getEditProductForm = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.render("products/edit", { product });
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const product = await Product.findByPk(req.params.id);

  let image = product.image;
  if (req.file) {
    fs.unlinkSync(path.join(__dirname, "../uploads/", image)); // Xóa ảnh cũ
    image = req.file.filename;
  }

  await product.update({ name, price, description, image });
  res.redirect("/products");
};

// Xóa mềm sản phẩm
exports.softDeleteProduct = async (req, res) => {
  await Product.update(
    { deletedAt: new Date() },
    { where: { id: req.params.id } }
  );
  res.redirect("/products");
};

// Khôi phục sản phẩm đã xóa mềm
exports.restoreProduct = async (req, res) => {
  await Product.update({ deletedAt: null }, { where: { id: req.params.id } });
  res.redirect("/products/deleted");
};

// Lấy danh sách sản phẩm đã xóa mềm
exports.getDeletedProducts = async (req, res) => {
  const products = await Product.findAll({
    where: { deletedAt: { [Product.sequelize.Op.ne]: null } },
  });
  res.render("products/deleted", { products });
};
// Hàm hiển thị danh sách sản phẩm dạng shop (grid view)
exports.getShopProducts = async (req, res) => {
  const products = await Product.findAll({ where: { deletedAt: null } });
  res.render("products/shop", { products });
};
