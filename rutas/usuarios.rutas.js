;
'use strict'
const express = require('express')
const api = express.Router(),
controll = require('../controles/usuarios.control');
const middelwateAddress = (req, res, next) => {
    var fullUrl = req.headers.referer
    var method = req.method
    if (fullUrl !== "http://localhost:3000/"&&(method!=='PUT'||method!=='POST'||method!=='GET')) {
      res.status(404).send("no access");
    } else {
      next();
    }
  };
api.get('/prueba',middelwateAddress, controll.prueba)
api.get('/profiles',middelwateAddress, controll.getProfiles)
api.get('/findChampionship',middelwateAddress, controll.findChampionship)
api.get('/findRecord/:idChampionship',middelwateAddress, controll.findRecord)
api.get('/findProfileChampionship/:idProfileChampionship',middelwateAddress, controll.findSpecificProfileChampionship)
api.get('/getImagesPilots/:name',middelwateAddress, controll.getImagesPilots)
api.get('/findAllProfileChampionship',middelwateAddress, controll.findAllProfileChampionship)
api.get('/find-track',middelwateAddress, controll.findTrack)
api.get('/find-folders',middelwateAddress, controll.arrImages)
api.get('/find-driver',middelwateAddress, controll.findDriver)
api.get('/find-scuderia',middelwateAddress, controll.findScuderia)
api.get('/find-championship-scuderias/:championship',middelwateAddress, controll.findChampionshipScuderias)
api.get('/find-track-championship/:championship',middelwateAddress, controll.findTracksChampionship)
api.get('/find-logo-scuderia/:name',middelwateAddress, controll.getLogosScuderias)
api.get('/find-fas-lasp-championship/:id',middelwateAddress, controll.findFasLapDriverChampionship)
api.get('/find-driver-vitae-championship/:championship',middelwateAddress, controll.findDriverVitaeChampionship)
api.get('/find-championship-scuderia/:scuderia/:championship',middelwateAddress, controll.findChampionshipScuderia)
api.get('/find-championship-driver/:driver/:championship',middelwateAddress, controll.findChampionshipDriver)
api.get('/find-all-drivers-championship/:championship',middelwateAddress, controll.findPointsDriverChampionship)
api.get('/find-all-scuderias-championship/:championship',middelwateAddress, controll.findAllScuderiasChampionship)
api.get('/get-ByUserId-Reservation',middelwateAddress, controll.getByUserIdReservation)
api.get('/get-random-ondaword',middelwateAddress, controll.getRandomOndaWord)
api.get('/get-word/:word',middelwateAddress, controll.ondaWordChecked)
api.get('/get-autorization',middelwateAddress, controll.checkToken)
api.get('/get-by-id-driver', controll.findByIdDriver)

api.post('/testArr', controll.testArr)
api.post('/testUpdateArr', controll.testUpdateArr)
api.post('/testUnsetArr', controll.testUnsetArr)
api.post('/create-new-user',middelwateAddress, controll.setNewUser)
api.post('/onda-word-register',middelwateAddress, controll.ondaWordRegister)
api.post('/check-onda-word',middelwateAddress, controll.checkOndaWord)
api.post('/create-new-reservation',middelwateAddress, controll.setNewReservation)
api.post('/create-championship',middelwateAddress, controll.createChampionship)
api.post('/create-record',middelwateAddress, controll.createRecord)
api.post('/create-user',middelwateAddress, controll.createProfile)
api.post('/create-fault',middelwateAddress, controll.createFault)
api.post('/profileChampionship',middelwateAddress, controll.createProfileChampionship)
api.post('/create-track',middelwateAddress, controll.createTrack)
api.post('/create-driver',middelwateAddress, controll.createDriver)
api.post('/create-scuderia',middelwateAddress, controll.createScuderia)
api.post('/create-tracks-champuonship',middelwateAddress, controll.createTracksChampionship)
api.post('/create-scuderias-champuonship',middelwateAddress, controll.createScuderiasChampionship)
api.post('/update-champuonship',middelwateAddress, controll.updateChampionship)
api.post('/update-track',middelwateAddress, controll.updateTrack)
api.post('/update-track-championship',middelwateAddress, controll.updateTrackChampionship)
api.post('/create-driver-vitae-championship',middelwateAddress, controll.createDriverVitaeChampionship)
api.post('/create-fas-lap-driver-championship',middelwateAddress, controll.createFasLapDriverChampionship)
api.post('/update-track',middelwateAddress, controll.updateTrack)
api.post('/update-driver',middelwateAddress, controll.updateDriver)
api.post('/update-victory-driver', controll.updateNewVictoryDriver)
api.post('/update-favorite-track-driver', controll.updateFavoriteTrackDriver)
api.post('/insert-record-driver', controll.insertRecordDriver)
api.post('/update-record-driver', controll.updateRecordDriver)
api.post('/delete-record-driver', controll.deleteRecordDriver)
api.post('/update-scuderia',middelwateAddress, controll.updateScuderia)
api.post('/update-scuderia-championship',middelwateAddress, controll.updateScuderiaChampionship)
api.post('/update-championship-scuderia',middelwateAddress, controll.updateChampionshipScuderia)
api.post('/update-championship-driver',middelwateAddress, controll.updateChampionshipDriver)
api.post('/create-championship-driver',middelwateAddress, controll.createChampionshipDriver)
api.post('/create-championship-scuderia',middelwateAddress, controll.createChampionshipScuderia)
module.exports = api