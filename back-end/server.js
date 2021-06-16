require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { env } = require("process");

//----------------------------------------------------------------
const dbConnect = require("./data-base/config/config");

//--Создание экземпляра приложения--------------------------------
const app = express();

//--Подключение роутов--------------------------------------------
const indexRoutes = require("./routes/indexRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//--
app.use(morgan("dev"));

//--Базовый роутинг-----------------------------------------------
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

//--Запуск сервера------------------------------------------------
app.listen(process.env.PORT, () => {
  console.clear();
  console.log("Server has been started at PORT:", process.env.PORT);
  dbConnect();
});
