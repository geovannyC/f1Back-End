("use strict");
require('dotenv').config();
const mongoose = require("mongoose");
const username = process.env.USER;
const password = process.env.PWD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;
const uri = `mongodb+srv://${username}:${password}@${cluster}.pekvd.mongodb.net/${dbname}`

mongoose.Promise = global.Promise;
console.log(username)
mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {

    console.log("La conexión a la base de datos se ha realizado correctamente");

    // CREAR EL SERVIDOR WEB CON NODEJS
  })
  // Si no se conecta correctamente escupimos el error
  .catch((err) => console.log(err));

module.exports = mongoose;
