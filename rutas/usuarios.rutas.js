;
'use strict'
const express = require('express')
const api = express.Router(),
usuarioControl = require('../controles/usuarios.control')
api.get('/prueba', usuarioControl.prueba)
api.get('/obtenerusuario/:id',usuarioControl.getUser)
api.get('/listapedidos/:id',usuarioControl.getOrder)
api.post('/login', usuarioControl.login)
api.post('/createUser', usuarioControl.setUser)
api.post('/ordenarpedido', usuarioControl.setOrder)
api.post('/actualizarOrdenes', usuarioControl.updateOrders)
api.post('/findEmail', usuarioControl.findEmail)
api.post('/cancelarOrden', usuarioControl.updateStateOrder)

module.exports = api