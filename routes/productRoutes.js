const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/add", addProduct);
router.post("/update/:id", updateProduct);
router.post("/delete/:id", deleteProduct);

module.exports = router;
