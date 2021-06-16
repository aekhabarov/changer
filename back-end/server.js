require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { env } = require("process");

//----------------------------------------------------------------
const dbConnect = require("./data-base/config/config");

//--Создание экземпляра приложения--------------------------------
const app = express();

//--Подключение роутов--------------------------------------------
const indexRoutes = require("./routes/indexRoutes");
const productRoutes = require("./routes/productRoutes");

//--Подключение midllewares----------------------------------------
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//--Базовый роутинг-----------------------------------------------
app.use("/api", indexRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 4000;

//--Запуск сервера------------------------------------------------
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.clear();
      console.log(`Server has been started on PORT: ${PORT}`);
      dbConnect();
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
