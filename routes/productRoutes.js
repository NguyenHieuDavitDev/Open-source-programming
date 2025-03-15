const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productController");

const upload = multer({ dest: "uploads/" });

router.get("/", productController.getAllProducts);
router.get("/add", productController.getAddProductForm);
router.post("/add", upload.single("image"), productController.addProduct);
router.get("/edit/:id", productController.getEditProductForm);
router.post(
  "/edit/:id",
  upload.single("image"),
  productController.updateProduct
);
router.get("/delete/:id", productController.softDeleteProduct);
router.get("/deleted", productController.getDeletedProducts);
router.get("/restore/:id", productController.restoreProduct);

module.exports = router;
