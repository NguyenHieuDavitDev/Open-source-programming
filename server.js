const express = require("express");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const productController = require("./controllers/productController"); // Import controller
const app = express();

app.use(express.urlencoded({ extended: false }));

// Phục vụ file tĩnh (public và uploads)
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

// Route gốc hiển thị shop sản phẩm
app.get("/", productController.getShopProducts);

// Các route CRUD khác
app.use("/products", productRoutes);

app.set("view engine", "ejs");

sequelize.sync().then(() => {
  console.log("Database connected.");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
