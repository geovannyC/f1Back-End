("use strict");
const http = require("http");
const express = require("express"),
  bodyParser = require("body-parser"),
  connectDb = require("../config/db"),
  cors = require("cors"),
  morgan = require("morgan"),
  app = express(),
  usuarioRuta = require("../rutas/usuarios.rutas");
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
app.use(express.json());
app.use(morgan("dev"));
app.use("/", usuarioRuta);
const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port);
