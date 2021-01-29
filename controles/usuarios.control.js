;
'use strict'

require('dotenv').config();
const mongodb = require('../models/models'),
    bcrypt = require('bcrypt'),
    nodeMailer = require('nodemailer');
    
    const USER = process.env.USER
    const PASS = process.env.PASS

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: USER,
        pass: PASS
    }
  });

  const prueba = (req, res)=>{
    res.status(200).send('Hola api')
}
const updateStateOrder = (req, res) =>{
  mongodb.Orders.findByIdAndUpdate(req.body.id, {estado: req.body.estado}, (err,doc)=>{
    if(err){
      res.status(404).send('error en el servidor')
    }else{
      res.status(200)
      res.json('actualizado exitosamente')
    }
  })
}
const setUser = async(req, res)=>{
    const saltRounds = 10
    bcrypt.hash(req.body.contra, saltRounds, (err, hash)=>{
      try{
        mongodb.Persons.insertMany({
          "nombre": req.body.nombre,
          "apellido": req.body.apellido,
          "telefono": req.body.telefono,
          "correo": req.body.correo,
          "contra": hash,
        },(err)=>{
          if(err){
            res.status(404).send('error en el servidor')
          }else{
            res.status(200)
            res.json('creado exitosamente')
          }
        })
    }catch{
        res.status(404)
    }
    })
}
const findEmail = async(req, res)=>{
    mongodb.Persons.find({
        "correo": req.body.correo
    },(err, doc)=>{
      if(err || doc.length===0){
        res.status(404).send('usuario inexistente')
        
      }else{
        
        res.status(200)
        res.json('usuario ya registrado')
        
      }
    }
  )
}
const login = async(req, res)=>{
    
  
 
      mongodb.Persons.find({"correo": req.body.correo}).exec((err, doc)=>{
        if(err){
            res.status(404).send(('usuario incorrecto'))
        }else{
            if(doc===null || doc.length === 0){
                  res.status(404).send('usuario incorrecto');
              }else{
                try {
                  bcrypt.compare(req.body.contra, doc[0].contra, (err, result)=>{
                    if(result){
                        let user = doc[0]
                      delete user.contra
                      let data = {
                        datos: user
                        
                      }
                      
                      res.json(data)
                    }else{
                      res.status(404)
                      res.json('usuario incorrecto')
                    }
                  })
                }catch{
                  res.status(404)
                  res.json('usuario incorrecto');
                }
              }
              
        }
      })


}
const setOrder = async(req, res)=>{
    
  
      try{
        mongodb.Orders.create(req.body,(err)=>{
          if(err){
            res.status(404).send('error en el servidor')
          }else{
      
            res.status(200)
            res.json('creado exitosamente')
          }
        })
    }catch{
        res.status(404)
    }
  
}
const getUser = async(req, res)=>{
   
          mongodb.Persons.find({
              "_id": req.params.id
          }).then(contenido => {
            if(contenido.length===0){
             
              res.status(404).send('no hay usuarios activos')
            }else{
              res.status(200)
              res.json(contenido)
              
            }
          })
        
}
const getApiAndEmit = socket => {
  const date = new Date()
  let dataF = JSON.stringify(date).split('"')[1].split('.')[0].split(':')
  dataF.pop()
  socket.emit("FromAPI", date);

  console.log(date)
  mongodb.Orders.find().then((response)=>{
    
    if(response.length===0){
      return null
    }else{
      response.map((item)=>{
        
        if(item.estado==='pendiente'){
          
          let fechaArribo= item.fechaArribo.split('.')[0].split(':')
          fechaArribo.pop()
         
          if(fechaArribo[0]===dataF[0]&& fechaArribo[1]===dataF[1]){
            mongodb.Orders.findByIdAndUpdate(item._id,{estado: 'entregado'}, (err, doc)=>{
              if(err){
                return console.log('error al actualizar')
              }else{
                return console.log('actualizado')
              }
            })
            console.log('Tu pedido ha llegado')
            mongodb.Persons.findById(item.usuario).then((response)=>{
              console.log(item.ciudadsalida)
            let mailOptions = {
                to: response.correo,
                subject: `Felicitaciones tu pedido de ${item.ciudadsalida} ha llegado`,
                text: 'La app Route Software te informa que tu pedido ha llegado con exito',
            };
  
            transporter.sendMail(mailOptions, (err, info) => {
   
            if(err){
              console.log('error servidor')
              console.log(err)
            }else{
  
              console.log('mensaje enviado')
            }
          });
                    })
  
                  }
        }

              })
            }
          })
        };

const getOrder = async(req, res)=>{
   
    mongodb.Orders.find({usuario: req.params.id}).populate({path: "persons"}).exec((err, doc)=>{
        if(err || doc.length===0){
            res.status(404).send('sin documento del pedido')
        }else{
          
            console.log(doc)
            res.status(200)
            res.json(doc)
        }
    })

    }
  const updateOrders =async(req, res)=>{
    mongodb.Orders.updateMany({
        "_id": req.body.id
    }, {"$set": {"estado": req.body.estado}},{"multi": true}, (err, doc)=>{
        if(err ){
            res.status(404).send('fallo al actualizar orders')
            console.log('fallo al actualizar orders')
        }else{
            res.status(200)
            res.json('actualizado')
        }
    })
  }
module.exports={
    prueba,
    setUser,
    getUser,
    setOrder,
    getOrder,
    updateOrders,
    login,
    findEmail,
    getApiAndEmit,
    updateStateOrder
  
}