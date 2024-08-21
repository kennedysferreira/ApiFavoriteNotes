require("dotenv/config");
require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/appError");
const migrationRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(cors());
app.use(routes);

migrationRun();

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);

  return res.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = process.env.SERVER_PORT || 3332;

app.listen(PORT, () => {
  console.log(`Esta executando na porta: ${PORT}`);
});
