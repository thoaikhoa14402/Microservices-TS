import express, { Request, Response } from "express";
import { config } from "dotenv";
import { setupCategoryModule } from "./modules/category";
import { sequelize } from "./share/component/sequelize";

config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const app = express();
  const port = 3000;

  app.use(express.json());

  app.use("/v1", setupCategoryModule(sequelize));
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
