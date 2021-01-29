'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
const persons = Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    correo: String,
    contra: String,
},
{timestamps: true});
const orders = Schema({
    usuario:{
        type: mongoose.Schema.ObjectId,
        ref: 'persons'
    },
    ciudadsalida: String,
    ciudadllegada: String,
    estadosalida: String,
    estadollegada: String,
    costo: String,
    fechaArribo: String,
    estado: String
},
{timestamps: true})
const Persons = mongoose.model('persons', persons),
     Orders = mongoose.model('orders', orders);

     module.exports = {
         Persons,
         Orders
     }