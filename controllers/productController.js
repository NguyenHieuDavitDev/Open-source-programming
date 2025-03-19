const { Product } = require("../models");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("image");

const getProducts = async (req, res) => {
  try {
    const { search = "", sort = "" } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    let orderClause = [];
    if (sort === "price_asc") orderClause.push(["price", "ASC"]);
    if (sort === "price_desc") orderClause.push(["price", "DESC"]);
    if (sort === "discount_asc") orderClause.push(["discount", "ASC"]);
    if (sort === "discount_desc") orderClause.push(["discount", "DESC"]);

    const products = await Product.findAll({
      where: whereClause,
      order: orderClause,
    });

    res.render("products", { products, search, sort });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};

const addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Lỗi upload ảnh:", err);
      return res.status(500).send("Upload ảnh thất bại");
    }

    try {
      const { name, price, discount } = req.body;
      const image = req.file ? req.file.filename : null;

      await Product.create({ name, price, discount, image });
      res.redirect("/products?message=add_success");
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      res.status(500).send("Lỗi thêm sản phẩm");
    }
  });
};

const updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Lỗi upload ảnh:", err);
      return res.status(500).send("Upload ảnh thất bại");
    }

    try {
      const { id } = req.params;
      const { name, price, discount } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      const updateData = { name, price, discount };
      if (req.file) {
        updateData.image = req.file.filename;
      }

      await Product.update(updateData, { where: { id } });
      res.redirect("/products?message=update_success");
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      res.status(500).send("Lỗi cập nhật sản phẩm");
    }
  });
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm để xóa");
    }

    await Product.destroy({ where: { id } });
    res.redirect("/products?message=delete_success");
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    res.status(500).send("Lỗi xóa sản phẩm");
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
