const { Product } = require("../models");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");

// Cấu hình Multer để upload ảnh sản phẩm
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("image");

// Lấy danh sách sản phẩm + tìm kiếm + bộ lọc
const getProducts = async (req, res) => {
  try {
    const { search = "", sort = "" } = req.query; // Tránh lỗi undefined
    let whereClause = {};

    //  Tìm kiếm sản phẩm theo tên
    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    //  Bộ lọc sản phẩm theo giá hoặc giảm giá
    let orderClause = [];
    if (sort === "price_asc") orderClause.push(["price", "ASC"]);
    if (sort === "price_desc") orderClause.push(["price", "DESC"]);
    if (sort === "discount_asc") orderClause.push(["discount", "ASC"]);
    if (sort === "discount_desc") orderClause.push(["discount", "DESC"]);

    //  Truy vấn danh sách sản phẩm
    const products = await Product.findAll({
      where: whereClause,
      order: orderClause,
    });

    // Render trang products.ejs
    res.render("products", { products, search, sort });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};

//  Thêm sản phẩm mới
const addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Lỗi upload ảnh:", err);
      return res.status(500).send("Upload ảnh thất bại");
    }

    try {
      const { name, price, discount } = req.body;
      const image = req.file ? req.file.filename : null; // Kiểm tra nếu có ảnh

      await Product.create({ name, price, discount, image });
      res.redirect("/products?message=add_success"); // Gửi thông báo khi thêm thành công
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      res.status(500).send("Lỗi thêm sản phẩm");
    }
  });
};

//  Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Lỗi upload ảnh:", err);
      return res.status(500).send("Upload ảnh thất bại");
    }

    try {
      const { id } = req.params;
      const { name, price, discount } = req.body;

      // Kiểm tra xem sản phẩm có tồn tại không
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      const updateData = { name, price, discount };
      if (req.file) {
        updateData.image = req.file.filename; // Nếu có ảnh mới thì cập nhật
      }

      await Product.update(updateData, { where: { id } });
      res.redirect("/products?message=update_success"); // Gửi thông báo cập nhật thành công
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      res.status(500).send("Lỗi cập nhật sản phẩm");
    }
  });
};

//  Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //  Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm để xóa");
    }

    await Product.destroy({ where: { id } });
    res.redirect("/products?message=delete_success"); // Gửi thông báo khi xóa thành công
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    res.status(500).send("Lỗi xóa sản phẩm");
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
