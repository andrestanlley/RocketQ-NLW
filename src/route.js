const express = require('express')
const questionController = require('./controllers/question-controller')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

route.get('/', (req,res) => res.render("index", {page: 'enter-room'}))
route.get('/room/:room', (req, res) => res.render("room"))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.post('/question/:room/:question/:action',express.urlencoded({extended: true}), questionController.index)
route.post('/create-room', express.urlencoded({extended: true}), RoomController.create)

module.exports = route