// routes/post.routes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Endpoint thống kê (công khai)
router.get("/stats", postController.getPostStats);

// Tăng lượt xem (công khai)
router.patch("/:id/views", postController.updatePostViews);

// Cập nhật trạng thái bài viết (công khai)
router.patch("/:id/status", postController.updatePostStatus);

// Lấy danh sách bài viết (công khai)
router.get("/", postController.getAllPosts);

// Lấy chi tiết bài viết (công khai)
router.get("/:id", postController.getPostById);

// Tạo bài viết (công khai)
router.post("/", postController.createPost);

// Cập nhật bài viết (công khai)
router.put("/:id", postController.updatePost);

// Xóa mềm bài viết (công khai)
router.delete("/:id", postController.deletePost);

module.exports = router;
