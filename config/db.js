("use strict");
require("dotenv").config();
const mongoose = require("mongoose");
const username = process.env.USER;
const password = process.env.PWD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;
const db = "mongodb://localhost:27017/f1";

mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection;
conSuccess.once("open", (_) => {
  console.log("Database connected:", db);
});

conSuccess
  .on("error", (err) => {
    console.error("connection error:", err);
  })
  // Si no se conecta correctamente escupimos el error
  .catch((err) => console.log(err));

module.exports = mongoose;
