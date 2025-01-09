const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userdb",
});

db.connect((err) => {
  if (err) {
    console.error("Kết nối database thất bại:", err);
  } else {
    console.log("Kết nối database thành công!");
  }
});

// API Đăng ký
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send("Lỗi server");
    } else {
      res.status(200).send("Đăng ký thành công");
    }
  });
});

// API Đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send("Lỗi server");
    } else if (result.length > 0) {
      res.status(200).send("Đăng nhập thành công");
    } else {
      res.status(401).send("Sai tài khoản hoặc mật khẩu");
    }
  });
});

// Khởi chạy server
const PORT = 5001; // Thay cổng 5000 bằng 5001 hoặc một cổng khác
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
