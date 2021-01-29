;
'use strict'
const http = require('http');
const express = require('express'),
      bodyParser = require('body-parser'),
      connectDb = require('../config/db'),
      cors = require('cors'),
      morgan = require('morgan'),
 socketIo = require("socket.io");
const app = express(),
    usuarioRuta = require('../rutas/usuarios.rutas'),
    usuarioControl = require('../controles/usuarios.control')
 
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors({
  origin: '*',
  credentials: true
}))
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use('/', usuarioRuta)
const server = http.createServer(app);
const io = socketIo(server); 
const port = process.env.PORT  || 4000

server.listen(port);
let interval;
module.exports= {
    io
}
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => usuarioControl.getApiAndEmit(socket), 50000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
