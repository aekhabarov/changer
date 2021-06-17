const mongoose = require("mongoose");

function dbConnect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Закрывать socket после 45 секунд без активности
    family: 4, // И пользовать IPv4, IPv6 не использовать
  };
  mongoose.connect(process.env.MONGO_URL_LOCAL, options, (err) => {
    if (err) return console.log(err);
    return console.log("Data-base connected, PORT: 27017");
  });
}

module.exports = dbConnect;
