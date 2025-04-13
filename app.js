// app.js
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

// Định nghĩa các route
app.use("/auth", require("./routes/auth.routes"));
app.use("/posts", require("./routes/post.routes"));
module.exports = app;
