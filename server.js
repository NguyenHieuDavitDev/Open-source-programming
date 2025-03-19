const express = require("express");
const app = express();
const { syncDatabase } = require("./models");
const productRoutes = require("./routes/productRoutes");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await syncDatabase();
  console.log(`Server running on http://localhost:${PORT}`);
});
