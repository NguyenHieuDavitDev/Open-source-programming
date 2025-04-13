// controllers/post.controller.js
const Post = require("../models/post.model");
const { Op } = require("sequelize");

// Tạo bài viết mới (không cần đăng nhập)
exports.createPost = async (req, res) => {
  try {
    const { title, content, status, tags, author_id } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    // Nếu không truyền author_id, gán là null
    const post = await Post.create({
      title,
      content,
      status,
      tags,
      author_id: author_id || null,
    });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({
      message: "Cannot create post",
      error: error.message,
    });
  }
};

// Lấy danh sách bài viết đã publish (có phân trang, tìm kiếm, lọc theo tag, status)
exports.getAllPosts = async (req, res) => {
  try {
    const { search, tag, status, page = 1, limit = 10 } = req.query;
    const where = {
      status: "published",
    };

    if (status) where.status = status;
    if (search) where.title = { [Op.like]: `%${search}%` };
    if (tag) where.tags = { [Op.like]: `%${tag}%` };

    const posts = await Post.findAndCountAll({
      where,
      limit: +limit,
      offset: (page - 1) * limit,
    });

    res.json({
      posts: posts.rows,
      total: posts.count,
      page: +page,
      limit: +limit,
    });
  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({
      message: "Cannot get posts",
      error: error.message,
    });
  }
};

// Lấy chi tiết bài viết (chỉ bài viết đã publish)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        status: "published",
      },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Get Post By ID Error:", error);
    res.status(500).json({
      message: "Error fetching post",
      error: error.message,
    });
  }
};

// Cập nhật bài viết (không cần đăng nhập)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { title, content, status, tags } = req.body;
    await post.update({ title, content, status, tags });
    res.json({ message: "Post updated", post });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({
      message: "Cannot update post",
      error: error.message,
    });
  }
};

// Xóa mềm bài viết (không cần đăng nhập)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.deleted = true;
    await post.save();
    res.json({ message: "Post soft deleted" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({
      message: "Cannot delete post",
      error: error.message,
    });
  }
};

// Tăng lượt xem của bài viết (công khai)
exports.updatePostViews = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.views += 1;
    await post.save();
    res.json({ message: "Views incremented", views: post.views });
  } catch (error) {
    console.error("Update Post Views Error:", error);
    res.status(500).json({
      message: "Cannot update views",
      error: error.message,
    });
  }
};

// Cập nhật trạng thái bài viết (không cần đăng nhập)
exports.updatePostStatus = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const { status } = req.body;
    const validStatuses = ["draft", "published", "archived"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status value" });
    post.status = status;
    await post.save();
    res.json({ message: "Status updated", post });
  } catch (error) {
    console.error("Update Post Status Error:", error);
    res.status(500).json({
      message: "Cannot update status",
      error: error.message,
    });
  }
};

// Thống kê bài viết (không cần đăng nhập)
exports.getPostStats = async (req, res) => {
  try {
    const total = await Post.count();
    const draft = await Post.count({ where: { status: "draft" } });
    const published = await Post.count({ where: { status: "published" } });
    const archived = await Post.count({ where: { status: "archived" } });
    const totalViews = await Post.sum("views");
    res.json({
      totalPosts: total,
      postsByStatus: { draft, published, archived },
      totalViews,
    });
  } catch (error) {
    console.error("Get Post Stats Error:", error);
    res.status(500).json({
      message: "Cannot get stats",
      error: error.message,
    });
  }
};
