// server.js
const app = require("./app");
const { sequelize, Role } = require("./models");

sequelize
  .sync()
  .then(async () => {
    console.log("Database synced");

    const roles = ["admin", "author"];
    for (let name of roles) {
      await Role.findOrCreate({ where: { name } });
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing DB:", err);
  });
